var mongoose = require('mongoose');
var behanceSchema = mongoose.Schema({
  id: {type: Number},
  name: { type: String },
  image: { type: String },
  url: { type: String },
});

// userSchema.methods.name = function() {
//   return this.displayName || this.username;
// };
//
// userSchema.methods.checkPassword = function(guess, done) {
//   bcrypt.compare(guess, this.password, function(err, isMatch) {
//     done(err, isMatch);
//   });
// };

var Behance = mongoose.model('Behance', behanceSchema);

module.exports = Behance;
