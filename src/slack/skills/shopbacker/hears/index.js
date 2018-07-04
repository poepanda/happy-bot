import { listenTo } from '../config';

export default (controller) => {
  listenTo.forEach((skill) => {
    const { patterns, from, handler } = skill;
    controller.hears(patterns, from, handler);
  });
};
