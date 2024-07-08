import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Command } from 'commander';
import { Db } from 'mongodb';
import mongoose, { connect } from 'mongoose';
import { GenderType } from 'shared/type/enum/gender-type.enum';
import { LocationType } from 'shared/type/enum/location-type.enum';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { REVIEW } from 'shared/type/review/review.constant';
import { TRAINING } from 'shared/type/training/traning.constant';
import { ReviewSchema } from '../review/entity/review.schema';
import { TrainingSchema } from '../training/entity/training.schema';
import { TRAINING_DEFAULT } from '../training/training.constant';
import { UserSchema } from '../user/entity/user.schema';
import { USER_DEFAULT } from '../user/user.constant';

const USER_COUNT = 30;
const COACH_COUNT = 10;
const SALT_ROUNDS = 10;
const PASSWORD = 'password';
const REF_DATE = new Date(2003, 0, 1);
const PAST_YEARS = 30;
const TRAINING_COUNT = 100;
const PRICE_MIN = 0;
const PRICE_MAX = 10000;
const RATING_PRECISION = 1;
const DISCOUNT_MIN = 0;
const DISCOUNT_MAX = 100;

@Injectable()
export class CliService {
  private readonly program: Command;
  private readonly logger = new Logger(CliService.name);

  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  private setupCommands() {
    this.program
      .name('FitFriendsCli')
      .description('FitFriends CLI generate utility')
      .passThroughOptions()
      .version('1.0.0');

    this.program
      .command('--generate')
      .alias('generate')
      .argument('<connectionString>', 'Database connection string')
      .description('Generate test data and save to DB')
      .action(async (connectionString: string) => {
        this.logger.log(
          `Generating items in the database with connection string: '${connectionString}'`,
        );
        await this.connectToDatabase(connectionString);
      });

    this.program
      .command('help')
      .description('Display help information')
      .action(() => {
        this.logger.log('Displaying help information');
        this.program.outputHelp();
      });
  }

  private async connectToDatabase(connectionString: string) {
    this.logger.log(`Connection to database '${connectionString}'...`);
    const mongoose = await connect(connectionString);
    const db: Db = mongoose.connection.db;
    await this.setupUsers();
    await this.setupTrainings(db);
    await this.setupReviews(db);
    await mongoose.connection.close();
  }

  private async setupUsers() {
    const User = mongoose.model('User', UserSchema);

    for (let i = 0; i < USER_COUNT; i++) {
      const role = i < COACH_COUNT ? RoleType.COACH : RoleType.VISITOR;

      const newUser = new User({
        dateOfBirth: faker.date.past({ years: PAST_YEARS, refDate: REF_DATE }),
        description: faker.lorem.sentence(),
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(Object.values(GenderType)),
        location: faker.helpers.arrayElement(Object.values(LocationType)),
        name: faker.animal.cat(),
        password: await hash(PASSWORD, await genSalt(SALT_ROUNDS)),
        role: role,
        profilePictureId: USER_DEFAULT.PROFILE_PICTURE_ID,
        avatarId: USER_DEFAULT.AVATAR_ID,
      });

      await newUser.save();
    }
  }

  private async setupTrainings(db: Db) {
    const Training = mongoose.model('Training', TrainingSchema);
    const usersCollection = db.collection('users');
    const coaches = await usersCollection
      .find({ role: RoleType.COACH })
      .toArray();

    for (let i = 0; i < TRAINING_COUNT; i++) {
      const coach = faker.helpers.arrayElement(coaches);

      const newTraining = new Training({
        coach: coach._id.toString(),
        name: faker.commerce.productName(),
        skillLevel: faker.helpers.arrayElement(Object.values(SkillLevelType)),
        workout: faker.helpers.arrayElement(Object.values(WorkoutType)),
        workoutDuration: faker.helpers.arrayElement(
          Object.values(WorkoutDurationType),
        ),
        price: faker.number.int({ min: PRICE_MIN, max: PRICE_MAX }),
        caloriesBurned: faker.number.int({
          min: TRAINING.CALORIES.MIN,
          max: TRAINING.CALORIES.MAX,
        }),
        description: faker.lorem.sentence(),
        gender: faker.helpers.arrayElement(Object.values(GenderType)),
        isSpecialOffer: faker.datatype.boolean(),
        rating: 0,
        discountPercent: faker.number.int({
          min: DISCOUNT_MIN,
          max: DISCOUNT_MAX,
        }),
        backgroundId: TRAINING_DEFAULT.BACKGROUND_ID,
        videoId: TRAINING_DEFAULT.VIDEO_ID,
      });

      await newTraining.save();
    }
  }

  private async setupReviews(db: Db) {
    const usersCollection = db.collection('users');
    const trainingsCollection = db.collection('trainings');
    const Training = mongoose.model('Training', TrainingSchema);
    const Review = mongoose.model('Review', ReviewSchema);
    const visitors = await usersCollection
      .find({ role: RoleType.VISITOR })
      .toArray();
    const trainings = await trainingsCollection.find().toArray();

    for (const training of trainings) {
      const commentsCount = faker.number.int({ min: 0, max: 20 });

      for (let i = 0; i < commentsCount; i++) {
        const visitor = faker.helpers.arrayElement(visitors);

        const newReview = new Review({
          user: visitor._id.toString(),
          training: training._id.toString(),
          rating: faker.number.float({
            min: REVIEW.RATING.MIN,
            max: REVIEW.RATING.MAX,
            multipleOf: RATING_PRECISION,
          }),
          text: faker.lorem.sentence(),
        });

        await newReview.save();
      }

      const rating = await this.calculateRating(training._id.toString());
      await Training.updateOne({ _id: training._id }, { rating });
    }
  }

  private async calculateRating(trainingId: string): Promise<number> {
    const Review = mongoose.model('Review', ReviewSchema);
    const reviews = await Review.find({ training: trainingId });
    if (!reviews.length) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.trunc(totalRating / reviews.length);
  }

  run() {
    this.logger.log('Running CLI Service');
    this.program.parse(process.argv);
  }
}
