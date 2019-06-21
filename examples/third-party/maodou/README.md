## Instructions for maodou-ketang-bot

This is a third-party bot built using wechaty and [maodouketang courses API](https://api.maodouketang.com).

* To see a preview demo of this bot, you need
  - simply add "毛豆课堂小助手" as your wechat friend and send msg to her.

* To run a bot of yourself, you need
  -  ```git clone``` this repo and ```cd wechaty-getting-started/examples/third-party/maodou```
  - Within this directory, type ```npm install``` and ```npm start``` and you are good to go!
  - ```npm run dev``` if you want to see all debug logs and debug your own code

To get your own authorization in fetchMaodouAPI, you need to follow these 3 steps:
1. Search a mini-program in wechat -> discover named "毛豆课堂", click it and login with your phone number.
2. Re-Login using your phone number in web page [kid.maodouketang.com](https://kid.maodouketang.com).
3. Find your auth_token in your browser->Application->Local Storage and replace authorization with auth_token value.

You can also use maodouketang api to create your own reminders for your and your kid's classtime alert.

Want to do more with this reminder bot? Please read this [maodou api spec](https://maodoukidclass.docs.apiary.io/).

## Speical Thanks to
* [xiaoli news API](https://xiaoli.ai) from which comes this original code boilerplate
* [Zixia](https://zixia.net) who inspires me to opensource this code and re-do coding after 15+ years

## Some useful referrences
* [@microsoft/recognizers-text-suite](https://github.com/microsoft/Recognizers-Text) I use this nlp api now to parse for time
  - [@microsoft/recognizers-text-suite](https://www.npmjs.com/package/@microsoft/recognizers-text-suite)
  - [@microsoft/recognizers-text-date-time](https://www.npmjs.com/package/@microsoft/recognizers-text-date-time)
* [bosonnlp](https://bosonnlp.com) I also use this nlp api to parse for title and location
  - [BosonNLP NER](http://docs.bosonnlp.com/ner.html)  this api is what I only find to get location, anyone knows other good solution?
* [Time-NLP](https://github.com/shinyke/Time-NLP)
* [ChiTimeNLP](https://github.com/JohnnieFucker/ChiTimeNLP) I used these two packages before switching to microsoft
  - [chi-time-nlp npm package](https://www.npmjs.com/package/chi-time-nlp) v1.0.4
  - [chi-time-nlp-after npm package](https://www.npmjs.com/package/chi-time-nlp-after) v1.0.5 improved version

## Contact
* http://maodou.io This is the company I work for
* Wechat ID: limingth, which is also [my personal github](https://github.com/limingth) ID