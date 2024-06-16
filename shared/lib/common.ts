import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';

type PlainObject = Record<string, unknown>;
export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function parseTime(time: string): TimeAndUnit {
  const logger = new Logger('TimeParser');
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    logger.error(`Bad time string: ${time}`);
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    logger.error(`Can't parse value count from ${time}. Result is NaN.`);
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}

export function addTime(value: number, unit: string): Date {
  const date = new Date();

  switch (unit) {
    case 'h':
      date.setHours(date.getHours() + value);
      break;
    case 'm':
      date.setMinutes(date.getMinutes() + value);
      break;
    case 's':
      date.setSeconds(date.getSeconds() + value);
      break;
    case 'd':
      date.setDate(date.getDate() + value);
      break;
    case 'M':
      date.setMonth(date.getMonth() + value);
      break;
    default:
      throw new Error('Unsupported time unit');
  }

  return date;
}
