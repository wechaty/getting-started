## Instructions for maodou-ketang-bot

This is a third-party bot built using wechaty and [maodouketang courses API](https://api.maodouketang.com).

Within this directory, type ```npm install``` and ```npm start``` and you are good to go!

You can use maodouketang api to create your own reminders for your and your kid's classtime alert.

To get your own authorization in fetchMaodouAPI, you need to follow these steps:
1. Find a mini-program in wechat named "毛豆课堂", login with your phone number.
2. ReLogin using your phone number in [kid.maodouketang.com](https://kid.maodouketang.com).
3. Find your auth_token in your browser->Application->Local Storage and replace authorization with auth_token value.

Want to do more with this reminder bot? Please read this [maodou api spec](https://maodoukidclass.docs.apiary.io/).

## Speical Thanks to
* [xiaoli news API](https://xiaoli.ai) from which comes this original code boilerplate
* [Zixia](https://zixia.net) who inspires me to opensource this code and re-do coding after 15+ years

## Some useful referrences
* [@microsoft/recognizers-text-suite]() I use this nlp api now to parse for time
  - [@microsoft/recognizers-text-suite](https://www.npmjs.com/package/@microsoft/recognizers-text-suite)
  - [@microsoft/recognizers-text-date-time](https://www.npmjs.com/package/@microsoft/recognizers-text-date-time)
* [bosonnlp](https://bosonnlp.com) I also use this nlp api in maodou-classes-bot.js
  - [BosonNLP NER](http://docs.bosonnlp.com/ner.html)  I used this api to get title and location in bot's msgText
* [Time-NLP](https://github.com/shinyke/Time-NLP)
* [ChiTimeNLP](https://github.com/JohnnieFucker/ChiTimeNLP) I used these two packages before switching to microsoft
  - [chi-time-nlp npm package](https://www.npmjs.com/package/chi-time-nlp) v1.0.4
  - [chi-time-nlp-after npm package](https://www.npmjs.com/package/chi-time-nlp-after) v1.0.5 improved version

## Contact
* http://maodou.io This is what I work for
* Wechat ID: limingth, which is also [my personal github](https://github.com/limingth) ID