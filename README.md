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
  try {
    const startPayload = ctx.startPayload || '';
    const userId = ctx.chat.id;
    const urlSent = `${web_link}?ref=${startPayload}&userId=${userId}`;
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username.replace(/[-.!]/g, '\\$&')}` : user.first_name;

    const messageText = `
*Hey, ${userName}\* Prepare for an out-of-this-world adventure! 🌌🚀\.

      TheLunarCoin Power Tap mini-game has just landed on Telegram, and it’s going to be epic!

⚡ Get ready to be hooked!. ⚡\.

🤑 Farm tokens, conquer challenges, and score insane loot\.

💥 Form squads and invite your crew for double the fun (and double the tokens)!\.

   With TheLunarCoin, mastering cryptocurrency is a breeze. From wallets to trading, earning, and cards, we’ve got everything you need to dominate the cryptoverse!

🚀 Let the lunar adventure begin! 🚀

* Lunar Token is not a virtual currency.*
 `;

    await ctx.replyWithMarkdown(messageText, {
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
  } catch (error) {
    console.error('Error in start handler:', error);
  }
});

// Referral Command Handler
bot.command('referral', async (ctx) => {
  const referralCode = Math.random().toString(36).substring(7);
  const userId = ctx.from.id;
  try {
    const userDocRef = db.collection('Squad').doc(referralCode);
    const userSnapshot = await userDocRef.get();
    if (!userSnapshot.exists) {
      await userDocRef.set({
        claimedReferralCount: 0,
        referralEarnings: 0
      });
      ctx.reply(`Your referral code is: ${referralCode}`);
    } else {
      ctx.reply('A referral code with this ID already exists. Please try again.');
    }
  } catch (error) {
    console.error('Error writing document: ', error);
    ctx.reply('There was an error generating your referral code. Please try again.');
  }
});

const storeReferral = async (refUserId, newUserId) => {
  if (!refUserId || !newUserId || refUserId === newUserId.toString()) {
    console.error('Invalid refUserId or newUserId:', { refUserId, newUserId });
    return;
  }

  try {
    const newUserDocRef = db.collection('users').doc(newUserId.toString());
    const newUserDoc = await newUserDocRef.get();

    if (newUserDoc.exists) {
      console.log('New user already exists:', newUserId);
      return;
    }

    await newUserDocRef.set({});
    console.log('New user created:', newUserId);

    const referralDocRef = db.collection('Squad').doc(refUserId);
    const referralDoc = await referralDocRef.get();
    if (referralDoc.exists) {
      const referralData = referralDoc.data();

      if (!referralData.newUserIds.includes(newUserId)) {
        referralData.newUserIds.push(newUserId);
        referralData.referralCount += 1;
        referralData.referralEarnings = 1000 * referralData.referralCount;
        referralData.totalBalance = 1000 * referralData.referralCount;

        await referralDocRef.update(referralData);
        console.log('Referral stored successfully');
      } else {
        console.log('New user ID already exists in the referral list');
      }
    } else {
      await referralDocRef.set({
        refUserId,
        newUserIds: [newUserId],
        referralCount: 1,
        referralEarnings: 1000,
        totalBalance: 1000
      });
      console.log('Referral stored successfully');
    }
  } catch (error) {
    console.error('Error storing referral: ', error);
  }
};

// Launch the bot
bot.launch().then(() => {
  console.log('Bot is running...');
}).catch(error => {
  console.error('Error launching bot:', error);
});

module.exports = bot;

// Express server setup
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


  const messageText = `
*Hey, ${userName}\* Prepare for an out-of-this-world adventure! 🌌🚀\.

      TheLunarCoin Power Tap mini-game has just landed on Telegram, and it’s going to be epic!

⚡ Get ready to be hooked!. ⚡\.

🤑 Farm tokens, conquer challenges, and score insane loot\.

💥 Form squads and invite your crew for double the fun (and double the tokens)!\.

   With TheLunarCoin, mastering cryptocurrency is a breeze. From wallets to trading, earning, and cards, we’ve got everything you need to dominate the cryptoverse!

🚀 Let the lunar adventure begin! 🚀

* Lunar Token is not a virtual currency.*
 `;

const token = process.env.TOKEN || '7233165030:AAEl_z6x1v9zvGcpMf1TQbpr390_j7SIHJg';
