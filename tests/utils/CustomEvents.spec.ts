import { CustomEvents, Event } from '@/utils/CustomEvents';

const timestamp = Date.now();

describe('Event', () => {
  const event = new Event('event');
  event.data = timestamp;

  test('Create', () => {
    expect(Event).toBeDefined();
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.data).toStrictEqual(timestamp);
  });
});

describe('CustomEvents', () => {
  const event = new Event('time');
  event.data = timestamp;

  const callback = jest.fn((event: Event) => {
    expect(event).toStrictEqual(event);
    expect(event.data).toStrictEqual(timestamp);
  });

  test('Create', () => {
    expect(CustomEvents).toBeDefined();
  });

  test('add & dispatch', () => {
    CustomEvents.add('time', callback);
    CustomEvents.dispatch('time', timestamp);
    expect(callback).toHaveBeenCalledWith(event);
  });

  test('remove', () => {
    CustomEvents.remove('time');
    CustomEvents.dispatch('time', timestamp);
    expect(callback).not.toHaveBeenCalled();
  });

  test('dispose', () => {
    CustomEvents.add('time', callback);
    CustomEvents.dispose();

    CustomEvents.dispatch('time', timestamp);
    expect(callback).not.toHaveBeenCalled();
  });
});
