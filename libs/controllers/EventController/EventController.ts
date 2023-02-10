import client from '../../client';
import InvalidMissingParamsError from '../../errors/InvalidMissingParamsError';
import { EventType } from '../../types/EventType';
import readFolder, { FilesProps } from '../../utils/readFolder';

class EventController {
  private events: EventType[];

  constructor() {
    this.events = [];
  }

  emitEvents() {
    this.events.forEach((event) => {
      try {
        client.on(event.name, (args) => event.run(args));
      } catch (e) {
        console.log(e);
      }
    });
  }

  addEvent(event: EventType) {
    const { name, run } = event;

    if (!name || !run) throw new InvalidMissingParamsError();

    this.events.push(event);
  }

  async handleEvents() {
    const path = 'libs/controllers/EventController/events';
    const files = await readFolder({
      path,
      extension: '.ts',
      returnProps: true,
    });

    files.forEach((file: FilesProps | string) => {
      if (typeof file !== 'string') {
        const { fileProps } = file;

        this.addEvent(fileProps);
      }
    });

    this.emitEvents();
  }
}

export default new EventController();
