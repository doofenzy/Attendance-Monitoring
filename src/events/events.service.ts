import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEventDto } from './dto/create.event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schema/events.scema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto) {
    const { name, date, location, description } = createEventDto;
    try {
      const eventExists = await this.eventModel.findOne({
        name,
        location,
        date,
      });

      if (eventExists) {
        throw new BadRequestException('Event already exists');
      }

      const event = await this.eventModel.create({
        name,
        date,
        location,
        description,
      });

      return event;
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  }
  async getEvent(id: any) {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      const event = await this.eventModel.findById(id);

      if (!event) {
        throw new BadRequestException('Event not found');
      }

      return event;
    } catch (error) {
      throw new Error(`Error fetching event: ${error.message}`);
    }
  }

  async getAllEvents() {
    try {
      const events = await this.eventModel
        .find()
        .sort({ createdAt: -1 })
        .select('-__v -createdAt -updatedAt');

      if (!events || events.length === 0) {
        throw new BadRequestException('No events found');
      }

      return events;
    } catch (error) {
      throw new Error(`Error fetching all events: ${error.message}`);
    }
  }
  async deleteEvent(id: any) {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      const event = await this.eventModel.findByIdAndDelete(id);
      if (!event) {
        throw new BadRequestException('Event not found');
      }

      return { message: 'Event deleted successfully', event };
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  }
  async updateEvent(createEventDto: CreateEventDto, id: any) {
    const { name, date, location, description } = createEventDto;
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      const event = await this.eventModel.findByIdAndUpdate(
        id,
        { name, date, location, description },
        { new: true },
      );

      if (!event) {
        throw new BadRequestException('Event not found');
      }

      return event;
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  }
}
