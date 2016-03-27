(function(){
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var sfdcObmLogSchema = new Schema({
    raw: { type: Schema.Types.Mixed },
    unwrapped: { type: Schema.Types.Mixed },
    created: { type: Date, default: Date.now }
  });

  sfdcObmLogSchema.pre('save', function(next) {
    var currentDate = new Date();
    if (!this.created) {
      this.created = currentDate;
    }
    next();
  });

  module.exports = mongoose.model('SfdcObmLog', sfdcObmLogSchema);

})();
