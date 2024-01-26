/*
 * jQuery Password Generator 1.1
 *
 * Copyright (c) 2022-2024 Michael Daum https://michaeldaumconsulting.com
 *
 * Licensed under the GPL licenses http://www.gnu.org/licenses/gpl.html
 *
 */

"use strict";
(function($) {

  var defaults = {
        length: 15,
        capitals: true,
        numbers: true,
        specialChars: true,
        target: null,
      };

  function PasswordGenerator(elem, opts) {
    var self = this;

    self.elem = $(elem);

    self.opts = $.extend({}, defaults, self.elem.data(), opts);
    self.init();
  }

  PasswordGenerator.prototype.init = function () {
    var self = this, regex;

    if (!self.regex) {
      regex = "";

      if (!self.opts.capitals) {
        regex += 'A-Z';
      }

      if (!self.opts.numbers) {
        regex += '\\d';
      }

      if (regex) {
        self.regex = new RegExp("[^"+regex+"]");
      }
    }

    self.generator = self.generator || new Jen(self.opts.specialChars);
    self.target = self.opts.target ? $(self.opts.target) : self.elem.prev("input");

    self.elem.on("click", function(ev) {
      var $substitute = $("<span />");

      // detatch password field temporarily, make it a text input, add the password and insert it back to the dom
      self.target.replaceWith($substitute).attr("type", "text").val(self.generate());

      $substitute.replaceWith(self.target);

      ev.preventDefault();
      return false;
    });
  };

  PasswordGenerator.prototype.generate = function () {
    var self = this;

    return self.generator.password(self.opts.length, self.opts.length, self.regex);
  }

  $(function() {
    $(".jqPasswordGenerator").livequery(function() {
      var $this = $(this);

      if (!$this.data("passwordGenerator")) {
        $this.data("passwordGenerator", new PasswordGenerator(this));
      }
    });
  });

})(jQuery);

