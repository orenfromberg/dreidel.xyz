(function ($) {

    $.cssprefix = function (property) {
        var cssProp = property;
        if ($.browser.webkit || $.browser.chrome) {
            cssProp = '-webkit-' + property;
        } else if ($.browser.mozilla) {
            cssProp = '-moz-' + property;
        } else if ($.browser.msie) {
            cssProp = '-ms-' + property;
        } else if ($.browser.opera) {
            cssProp = '-o-' + property;
        }
        return cssProp;
    }

    var SekKeyboard = {
        stdAngle: 45,
        xAngle: 75,
        angleStep: 40,
        scale: 1,
        scaleStep: 0.2,
        initialized: false,
        element: null,
        init: function (element) {
            var self = SekKeyboard;
            if (self.initialized) {
                return;
            }
            self.element = element;
            self.initialized = true;

            $('.pyramid3d').click(function (evt) {

                var a = 10000 + Math.random() * 10000;
                var b = (Math.floor(a / 90) * 90) + (-25 + Math.random() * 50);

                var c = Math.floor(self.stdAngle / 360) * 360

                self.stdAngle = c + b;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);

            })

            $('body').keydown(function (evt) {
                switch (evt.keyCode) {
                    case 37: // arrow left
                    case 100: // 4 pad
                        evt.preventDefault();
                        self.stdAngle -= self.angleStep;
                        break;

                    case 38: // arrow up
                    case 104: // 8 numeric pad
                        evt.preventDefault();
                        self.xAngle += self.angleStep;
                        break;

                    case 39: // arrow right
                    case 102: // 6 numeric pad
                        evt.preventDefault();
                        self.stdAngle += self.angleStep;
                        break;

                    case 40: // arrow down
                    case 98: // 2 numeric pad
                        evt.preventDefault();
                        self.xAngle -= self.angleStep;
                        break;
                    case 107: // + numeric pad
                        evt.preventDefault();
                        self.scale += self.scaleStep;
                        break;

                    case 109: // - numeric pad
                        evt.preventDefault();
                        self.scale -= self.scaleStep;
                        break;
                };
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            });

            $('#button_grid_rotation_standard_left').click(function () {
                var self = SekKeyboard;
                self.stdAngle -= self.angleStep;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            })

            $('#button_grid_rotation_standard_right').click(function () {
                var self = SekKeyboard;
                self.stdAngle += self.angleStep;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            })

            $('#button_grid_rotation_3dx_up').click(function () {
                var self = SekKeyboard;
                self.xAngle += self.angleStep;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            })

            $('#button_grid_rotation_3dx_down').click(function () {
                var self = SekKeyboard;
                self.xAngle -= self.angleStep;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            })

            $('#button_grid_zoom_out').click(function () {
                var self = SekKeyboard;
                self.scale -= self.scaleStep;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            })

            $('#button_grid_zoom_in').click(function () {
                var self = SekKeyboard;
                self.scale += self.scaleStep;
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            })


        },


    }

    $.fn.keyboard_controls = function () {
        // KEYBOARD COMMAND - GRID VIEW ORIENTATION
        SekKeyboard.init(this);
    }


    $.rotate3d = function (element, xAngle, stdAngle, scale) {
        element.attr('style', $.cssprefix('transform') + ': rotateX(' + xAngle + 'deg) rotate(' + stdAngle + 'deg) scale(' + scale + ');');
    }

})(jQuery);


$(document).ready(function () {
    $('.pyramid3d').keyboard_controls();
    setTimeout(function () {
        $.rotate3d($('.pyramid3d'), 90, 320, 1.2);
    }, 1000)
})

