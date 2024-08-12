import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Command } from 'commander';
import { Db } from 'mongodb';
import { connect, model } from 'mongoose';
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

const CLI_SETTINGS = {
  USER_COUNT: 30,
  COACH_COUNT: 10,
  SALT_ROUNDS: 10,
  PASSWORD: 'password',
  REF_DATE: new Date(2003, 0, 1),
  PAST_YEARS: 30,
  TRAINING_COUNT: 100,
  PRICE_MIN: 0,
  PRICE_MAX: 10000,
  RATING_PRECISION: 1,
  DISCOUNT_MIN: 0,
  DISCOUNT_MAX: 100,
};

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
        try {
          this.logger.log(
            `Generating items in the database with connection string: '${connectionString}'`,
          );
          await this.connectToDatabase(connectionString);
        } catch (error) {
          this.logger.error('Error during data generation', error);
          process.exit(1);
        }
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
    try {
      this.logger.log(`Connecting to database '${connectionString}'...`);
      const mongooseConnection = await connect(connectionString);
      const db: Db = mongooseConnection.connection.db;
      await this.setupUsers();
      await this.setupTrainings(db);
      await this.setupReviews(db);
      await mongooseConnection.connection.close();
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
      throw error;
    }
  }

  private async setupUsers() {
    const User = model('User', UserSchema);

    await Promise.all(
      Array.from({ length: CLI_SETTINGS.USER_COUNT }).map(async (_, i) => {
        const role =
          i < CLI_SETTINGS.COACH_COUNT ? RoleType.COACH : RoleType.VISITOR;

        const newUser = new User({
          dateOfBirth: faker.date.past({
            years: CLI_SETTINGS.PAST_YEARS,
            refDate: CLI_SETTINGS.REF_DATE,
          }),
          description: faker.lorem.sentence(),
          email: faker.internet.email(),
          gender: faker.helpers.arrayElement(Object.values(GenderType)),
          location: faker.helpers.arrayElement(Object.values(LocationType)),
          name: faker.animal.cat(),
          password: await hash(
            CLI_SETTINGS.PASSWORD,
            await genSalt(CLI_SETTINGS.SALT_ROUNDS),
          ),
          role: role,
          profilePictureId: USER_DEFAULT.PROFILE_PICTURE_ID,
          avatarId: USER_DEFAULT.AVATAR_ID,
        });

        await newUser.save();
      }),
    );
  }

  private async setupTrainings(db: Db) {
    const Training = model('Training', TrainingSchema);
    const usersCollection = db.collection('users');
    const coaches = await usersCollection
      .find({ role: RoleType.COACH })
      .toArray();

    await Promise.all(
      Array.from({ length: CLI_SETTINGS.TRAINING_COUNT }).map(async () => {
        const coach = faker.helpers.arrayElement(coaches);

        const newTraining = new Training({
          coach: coach._id.toString(),
          name: faker.commerce.productName(),
          skillLevel: faker.helpers.arrayElement(Object.values(SkillLevelType)),
          workout: faker.helpers.arrayElement(Object.values(WorkoutType)),
          workoutDuration: faker.helpers.arrayElement(
            Object.values(WorkoutDurationType),
          ),
          price: faker.number.int({
            min: CLI_SETTINGS.PRICE_MIN,
            max: CLI_SETTINGS.PRICE_MAX,
          }),
          caloriesBurned: faker.number.int({
            min: TRAINING.CALORIES.MIN,
            max: TRAINING.CALORIES.MAX,
          }),
          description: faker.lorem.sentence(),
          gender: faker.helpers.arrayElement(Object.values(GenderType)),
          isSpecialOffer: faker.datatype.boolean(),
          rating: 0,
          discountPercent: faker.number.int({
            min: CLI_SETTINGS.DISCOUNT_MIN,
            max: CLI_SETTINGS.DISCOUNT_MAX,
          }),
          backgroundId: TRAINING_DEFAULT.BACKGROUND_ID,
          videoId: TRAINING_DEFAULT.VIDEO_ID,
        });

        await newTraining.save();
      }),
    );
  }

  private async setupReviews(db: Db) {
    const usersCollection = db.collection('users');
    const trainingsCollection = db.collection('trainings');
    const Training = model('Training', TrainingSchema);
    const Review = model('Review', ReviewSchema);
    const visitors = await usersCollection
      .find({ role: RoleType.VISITOR })
      .toArray();
    const trainings = await trainingsCollection.find().toArray();

    await Promise.all(
      trainings.map(async (training) => {
        const commentsCount = faker.number.int({ min: 0, max: 20 });

        await Promise.all(
          Array.from({ length: commentsCount }).map(async () => {
            const visitor = faker.helpers.arrayElement(visitors);

            const newReview = new Review({
              user: visitor._id.toString(),
              training: training._id.toString(),
              rating: faker.number.float({
                min: REVIEW.RATING.MIN,
                max: REVIEW.RATING.MAX,
                multipleOf: CLI_SETTINGS.RATING_PRECISION,
              }),
              text: faker.lorem.sentence(),
            });

            await newReview.save();
          }),
        );

        const rating = await this.calculateRating(training._id.toString());
        await Training.updateOne({ _id: training._id }, { rating });
      }),
    );
  }

  private async calculateRating(trainingId: string): Promise<number> {
    const Review = model('Review', ReviewSchema);
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
