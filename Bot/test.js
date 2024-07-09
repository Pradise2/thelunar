require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const db = require('./firebase');
const firebaseAdmin = require('firebase-admin');

const app = express();
const token = process.env.TOKEN || '7233165030:AAEl_z6x1v9zvGcpMf1TQbpr390_j7SIHJg';
const bot = new Telegraf(token);

// Web App Link
const web_link = 'https://thelunarcoin.vercel.app/';

// Start Handler
bot.start(async (ctx) => {
  const startPayload = ctx.startPayload || '';
  const userId = ctx.chat.id;
  const urlSent = `${web_link}?ref=${startPayload}&userId=${userId}`;
  const user = ctx.message.from;
  const userName = user.username ? `@${user.username.replace(/[-.!]/g, '\\$&')}` : user.first_name;

  const messageText = `
*Hey, ${userName}\\! Welcome to Lunar\\!*
Tap [here](${urlSent}) and see your balance rise\\.

Bring them all into the game\\.
  `;

  ctx.replyWithMarkdown(messageText, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Start Now", web_app: { url: urlSent } }]
      ]
    },
  });

  if (startPayload.startsWith('ref_')) {
    const refUserId = startPayload.split('_')[1];
    if (refUserId && refUserId !== userId.toString()) {
      await storeReferral(refUserId, userId);
    } else {
      console.error('Invalid or same refUserId:', refUserId);
    }
  }
});


// Launch the bot
bot.launch();

module.exports = bot;
