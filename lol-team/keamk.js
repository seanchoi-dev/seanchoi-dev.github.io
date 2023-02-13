(function(t) {
    var e = (function() {
        extLink = function() {
            t('a.link-ext').click(function() {
                window.open(this.href);
                return !1
            });
            t('a.link-ext').mouseup(function() {
                t(this).blur()
            })
        }
        ;
        keamkTooltip = function() {
            t('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover'
            })
        }
        ;
        toggleTarget = function() {
            t('.toggle-it').click(function() {
                var e = t(this).attr('data-target');
                t(e).toggle()
            })
        }
        ;
        scrollToTarget = function() {
            t('.scroll-to').click(function() {
                var e = t(this).attr('data-target');
                t('html, body').animate({
                    scrollTop: t(e).offset().top
                }, 300)
            });
            t('.scroll-to-top').click(function() {
                t('html, body').animate({
                    scrollTop: 0
                }, 300)
            });
            t(window).scroll(function() {
                if (t(window).scrollTop() > 500) {
                    t('.scroll-to-top').fadeIn()
                } else {
                    t('.scroll-to-top').fadeOut()
                }
            })
        }
        ;
        johnFante = function() {
            var e = 'contactcharlesbukowskikeamkjackkerouaccom'
              , i = 'charlesbukowski'
              , a = 'jackkerouac';
            e = e.split(i);
            e[0] += '@';
            e = e[0].concat(e[1]);
            e = e.split(a);
            e[0] += '.';
            e = e[0].concat(e[1]);
            t('.john-fante').each(function() {
                t(this).html(e)
            });
            t('.ajohn-fante').each(function() {
                t(this).attr('href', 'mailto:' + e)
            })
        }
        ;
        setCookie = function(t, e, a) {
            var i = new Date();
            i.setTime(i.getTime() + (a * 24 * 60 * 60 * 1000));
            var n = '; expires=' + i.toGMTString();
            document.cookie = t + '=' + e + n + '; path=/'
        }
        ;
        init = function() {
            extLink();
            keamkTooltip();
            toggleTarget();
            scrollToTarget()
        }
        ;
        return {
            init: init
        }
    }
    )()
      , i = (function() {
        var a = t('div#mix_players')
          , o = t('#nb-participants')
          , e = a.find('.participant-div').length
          , l = e
          , n = t('div#mix_teams')
          , r = t('#nb-teams')
          , i = n.find('.team-div').length
          , c = i;
        setTypeMix = function() {
            var l = '<style type="text/css" id="style-temp">';
            cssText = function(t, e) {
                return '.gender-participant { display: ' + t + '; } .level-participant { display: ' + e + '; }'
            }
            ;
            var i = cssText('none', 'none')
              , a = cssText('block', 'none')
              , n = cssText('none', 'block')
              , o = t('input[name=\'mix[typeMix]\']:checked')
              , e = i;
            switch (o.val()) {
            case '1':
                e = a;
                break;
            case '2':
                e = n;
                break
            }
            ;t(l).text(e).appendTo('head');
            t('input[name=\'mix[typeMix]\']').change(function() {
                var e = i;
                switch (t(this).val()) {
                case '1':
                    e = a;
                    break;
                case '2':
                    e = n;
                    break
                }
                ;t('#style-temp').text(e)
            })
        };
        
        levelSystem = function() {
            setLevel('.level-participant');
            t('#mix_players').on({
                mouseenter: function() {
                    t(this).prevAll('label').andSelf().addClass('level-hover');
                    t(this).nextAll('label').removeClass('level-hover')
                },
                mouseleave: function() {
                    t(this).prevAll('label').andSelf().removeClass('level-hover');
                    var e = t(this).parent().closest('div');
                    setLevel(e)
                }
            }, '.level-participant label')
        };
        setLevel = function(e) {
            var i = t(e).find('input:checked');
            if (i.length > 0) {
                t(i).prevAll('label').andSelf().addClass('level-hover');
                t(i).nextAll().removeClass('level-hover')
            }
        };
        init = function() {
            levelSystem();
        }
        ;
        return {
            init: init
        }
    }
    )();
    t(e.init);
    t(i.init)
}
)(jQuery);
