import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create.event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get(':id')
  async getEvent(@Param() param: any) {
    return this.eventsService.getEvent(param.id);
  }

  @Get()
  async getALlEvents() {
    return this.eventsService.getAllEvents();
  }

  @Delete(':id')
  async deleteEvent(@Param() param: any) {
    return this.eventsService.deleteEvent(param.id);
  }

  @Patch(':id')
  async updateEvent(
    @Body() createEventDto: CreateEventDto,
    @Param() param: any,
  ) {
    return this.eventsService.updateEvent(createEventDto, param.id);
  }
}
