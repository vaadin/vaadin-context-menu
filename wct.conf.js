
module.exports = {
  registerHooks: function(context) {

    var platforms = process.env.SKIP_SAUCELABS ? [] : [
      'OS X 10.11/iphone@9.3',
      'OS X 10.11/ipad@9.3',
      'Linux/android@5.1',
      'Windows 10/microsoftedge@13',
      'Windows 10/internet explorer@11',
      'OS X 10.11/safari@10.0'
    ];

    context.options.plugins.sauce.browsers = platforms;
  }
};
