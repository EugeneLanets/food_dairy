import { Scenes } from 'telegraf';
import User from '../models/user.js';

const start = new Scenes.BaseScene('start');

start.enter(async (ctx) => {
  const uid = ctx.from.id;
  const user = await User.findById(uid);
  if (user) {
    await ctx.reply(`С возвращением, ${ctx.from.first_name}`);
  } else {
    const newUser = new User({
      _id: uid,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
      userName: ctx.from.username,
    });

    await newUser.save();
    await ctx.reply('Вижу вас как наяву!');
    await ctx.reply(`Я запомню вас, ${ctx.from.first_name}`);
  }
});

export default start;
