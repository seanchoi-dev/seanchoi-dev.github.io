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
        
        importList = function() {
            t('#import-p-button').click(function() {
                var n = t('#import-participant-list').val().split(/\n/)
                  , o = [];
                for (var i = 0; i < n.length; i++) {
                    if (/\S/.test(n[i])) {
                        o.push(t.trim(n[i]))
                    }
                }
                ;if (o.length > 0) {
                    a.children('div').remove();
                    e = 0;
                    t.each(o, function(e, i) {
                        if (addPlayer())
                            t('.input-participants').last().val(i)
                    });
                    updateSelectPlayers();
                    t('#import-participant').toggle()
                }
            });
            t('#import-t-button').click(function() {
                var a = t('#import-team-list').val().split(/\n/)
                  , o = [];
                for (var e = 0; e < a.length; e++) {
                    if (/\S/.test(a[e])) {
                        o.push(t.trim(a[e]))
                    }
                }
                ;if (o.length > 0) {
                    n.children('div').remove();
                    i = 0;
                    t.each(o, function(e, i) {
                        if (addTeam())
                            t('.input-teams').last().val(i)
                    });
                    updateSelectTeams();
                    t('#import-team').toggle()
                }
            });
            t('.modal-body').on('click', '.mix-list-team-item', function() {
                var e = t(this).data('id');
                t.ajax({
                    url: Routing.generate('list_team_ajax_item', {
                        id: e
                    }),
                    method: 'GET'
                }).done(function(e) {
                    n.children('div').remove();
                    i = 0;
                    t.each(e, function(e, i) {
                        if (addTeam())
                            t('.input-teams').last().val(i.name)
                    });
                    updateSelectTeams();
                    t('#mixListTeamModal').modal('hide')
                })
            });
            t('.modal-body').on('click', '.mix-list-player-item', function() {
                var i = t(this).data('id');
                t.ajax({
                    url: Routing.generate('list_player_ajax_item', {
                        id: i
                    }),
                    method: 'GET'
                }).done(function(i) {
                    a.children('div').remove();
                    e = 0;
                    t.each(i, function(e, i) {
                        if (addPlayer()) {
                            t('.input-participants').last().val(i.name);
                            var n = t('.gender-participant').last().find('input');
                            n.each(function() {
                                if (t(this).val() == i.gender) {
                                    t(this).prop('checked', !0)
                                }
                            });
                            var a = t('.level-participant').last().find('input');
                            a.each(function() {
                                if (t(this).val() == i.level) {
                                    t(this).prop('checked', !0)
                                }
                            });
                            setLevel('.level-participant')
                        }
                    });
                    updateSelectPlayers();
                    t('#mixListPlayerModal').modal('hide')
                })
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
        commentCheckLength = function() {
            t('#comment_body').keyup(function() {
                var a = t(this).val().length
                  , i = 500 - a
                  , e = '';
                if (i >= 0)
                    e = i;
                else {
                    t(this).val(t(this).val().substr(0, 500));
                    e = 0
                }
                ;t('#comment-char-left').text(e)
            })
        }
        ;
        dynamicModal = function() {
            t('#deleteCommentModal').on('show.bs.modal', function(e) {
                var i = t(e.relatedTarget)
                  , n = Routing.generate('comment_delete', {
                    fullId: i.data('fullid'),
                    idComment: i.data('comment-id')
                });
                var a = t(this);
                a.find('.my-modal-path').attr('href', n)
            });
            t('#deleteMixFromTabModal').on('show.bs.modal', function(e) {
                var a = t(e.relatedTarget)
                  , n = Routing.generate('mix_delete', {
                    fullId: a.data('fullid')
                });
                var i = t(this);
                i.find('.my-modal-path').attr('href', n)
            });
            t('#mixListTeamModal').on('show.bs.modal', function(e) {
                var i = t(this).find('.modal-body');
                i.load(Routing.generate('list_team_ajax'))
            });
            t('#mixListPlayerModal').on('show.bs.modal', function(e) {
                var i = t(this).find('.modal-body');
                i.load(Routing.generate('list_player_ajax'))
            })
        }
        ;
        popupSocial = function() {
            t('.popup').click(function(e) {
                var i = 575
                  , a = 400
                  , n = (t(window).width() - i) / 2
                  , o = (t(window).height() - a) / 2
                  , l = this.href
                  , r = 'status=1,width=' + i + ',height=' + a + ',top=' + o + ',left=' + n + ',scrollbars=yes';
                window.open(l, 'Share', r).focus();
                return !1
            })
        }
        ;
        validForm = function() {
            t('#mix_form').on('submit', function() {
                t('.error-form').remove();
                var e = t(this).find('input[name="mix[title]"]')
                  , i = t('.input-participants').first()
                  , a = t('.input-teams').first();
                if (t.trim(e.val()).length == 0) {
                    displayError('#div_mix_title');
                    return !1
                }
                ;if (t.trim(i.val()).length == 0 || t.trim(a.val()).length == 0) {
                    displayError('#mix_form_error');
                    return !1
                }
            });
            displayError = function(e) {
                var i = t(e).attr('data-error');
                t(e).append('<div class="alert alert-danger error-form" role="alert"><p>' + i + '</p></div>');
                t('html, body').animate({
                    scrollTop: t(e).offset().top
                }, 200)
            }
        }
        ;
        copyToClipboard = function() {
            t('.copytoclip').click(function() {
                t(this).parent().prev().select();
                document.execCommand('copy');
                t(this).tooltip('hide');
                var e = t(this).children(':first');
                e.tooltip({
                    placement: 'bottom'
                }).tooltip('show');
                e.on('hidden.bs.tooltip', function() {
                    t(this).tooltip('destroy')
                })
            })
        }
        ;
        init = function() {
            
            
            
            
            importList();
            setTypeMix();
            levelSystem();
            validForm();
            
            popupSocial();
            
            commentCheckLength();
            dynamicModal();
            copyToClipboard()
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
