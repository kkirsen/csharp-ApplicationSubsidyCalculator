(function() {
    const
        CONFIG = Object.assign({}, {
            REST_DOMAIN: (String(window.location).substr(0, 5) === 'https' ? 'https' : 'http') + '://'
                + 'cpa.legalaxy.com',
            POLLING_DOMAIN: (String(window.location).substr(0, 5) === 'https' ? 'https' : 'http') + '://'
                + 'd.cpa.legalaxy.com',
        }, (typeof window.PRAVOVED_CONFIG !== 'undefined' ? window.PRAVOVED_CONFIG : {})),
        DEFAULT_SETTINGS = {
            restDomain: CONFIG.REST_DOMAIN,
            pollingDomain: CONFIG.POLLING_DOMAIN,
            theme: '',
            skipDelay: false,
            standalone: false,
            startOnDialogOpen: false,
            isSkipped: false,
            disableDialog: false,
            behavior: 0,
            version: 'large',
            versionClient: null,
            hasMetaTagViewPort: false,
            position: 'right',
            mobileForceExternal: false,
            width: 320,
            height: 568,
            pageUrl: null,
            popupDelay: -1,
            operatorAvatar: '/images/avatars/0.png',
            operatorName: 'Евгений',
            operatorSurname: 'Беляев',
            operatorDescription: 'юрист-консультант'
        },
        getUrlParam = function(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        USER_SETTINGS = getUrlParam('settings') !== null ? JSON.parse(getUrlParam('settings')) : {},
        getSettingsParam = function(key) {
            if (typeof USER_SETTINGS[key] !== 'undefined') {
                return USER_SETTINGS[key];
            }
            return DEFAULT_SETTINGS[key];
        },
        getTheme = function(settings) {
            if (settings === null || settings === '') {
                return null;
            }
            var theme = Object.keys(settings).reduce(function(acc, key) {
                if (String(key).substr(0, 11) === 'themeCustom') {
                    var newKey = String(String(key).replace('themeCustom', ''));
                    newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
                    acc[newKey] = settings[key];
                }
                return acc;
            }, {});
            
            return (Object.keys(theme).length === 0) ? null : theme;
        },
        skipDelay = getUrlParam('skipDelay') && String(getUrlParam('skipDelay')) === 'true',
        isSkipped = getSettingsParam('disableDialog') && getSettingsParam('disableDialog') === 'true',
        standalone = getUrlParam('standalone') && String(getUrlParam('standalone')) === 'true',
        mobileForceExternal = getSettingsParam('mobileForceExternal') && String(getSettingsParam('mobileForceExternal')) === 'true',
        hasMetaTagViewPort = (
            getSettingsParam('hasMetaTagViewPort')
            && String(getSettingsParam('hasMetaTagViewPort')) === 'true'
        ) || standalone,
        startOnDialogOpen = (
            getSettingsParam('startOnDialogOpen') && String(getSettingsParam('startOnDialogOpen')) === 'true'
        ) || (mobileForceExternal && !standalone),
        popupDelay = parseInt(getSettingsParam('popupDelay'), 10) > 0
            ? parseInt(getSettingsParam('popupDelay'), 10) * 1000 : -1;

    const INITIAL_APP = {
        dialog: {
            widgetType: 'chat',
            id: getUrlParam('id'),
            partnerId: getUrlParam('partnerId'),
            pageUrl: getSettingsParam('pageUrl'),
            restDomain: getSettingsParam('restDomain'),
            pollingDomain: getSettingsParam('pollingDomain'),
            theme: getSettingsParam('theme'),
            themeCustom: getTheme(USER_SETTINGS),
            behavior: parseInt(getSettingsParam('behavior'), 10),
            hasMetaTagViewPort: !!hasMetaTagViewPort,
            mobileForceExternal: !!mobileForceExternal,
            clientScreenWidth: parseInt(getSettingsParam('width'), 10),
            clientScreenHeight: parseInt(getSettingsParam('height'), 10),
            chan: getSettingsParam('chan'),
            data1: getSettingsParam('data1'),
            data2: getSettingsParam('data2'),
            
            //will set by bot.asyncPrepareAndStart
            userId: null,
            version: null, //small, large
            versionId: null,
            //override version select by client
            versionClient: getSettingsParam('versionClient'),
            position: getSettingsParam('position'),
            operator: {
                avatar: getSettingsParam('operatorAvatar'),
                name: getSettingsParam('operatorName') + ' ' + getSettingsParam('operatorSurname'),
                isOnline: true,
                description: getSettingsParam('operatorDescription')
            },
            isClosed: !skipDelay,
            isSkipDelay: skipDelay,
            isTyping: false,
            isComplete: false,
            isClientTyping: false,
            isReadyOpenModal: false,
            isStandalone: standalone,
            isSkipped: isSkipped,
            clientTypingStopDelay: 1000,
            unread: 0,
            lastClientMessageTime: 0,
            lastDialogOpenTime: 0,
            items: [],
            formData: {
                question: ''
            },
            balloon: {
                text: '',
                size: null,
                align: null,
                isClosed: true,
                isForceClosed: false
            }
        },
        modalContacts: {
            isClosed: true,
            isPending: false,
            isSended: false,
            isOpenedByDelay: false,
            autoOpenDelay: popupDelay,
            focusOn: 'name',
            formData: {
                question: '',
                name: '',
                phone: '',
                city: ''
            },
            formErrors: {}
        },
        modalPolicy: {
            url: 'https://personal-data-processing-policy.blxy.ru/',
            isClosed: true
        },
        bot: {
            settings: {
                startDelay: startOnDialogOpen || skipDelay ? 500 : 5000,
                typingDelayAfterClientMessage: 1000,
                typingDuration: 2000,
                startOnDialogOpen: startOnDialogOpen
            },
            startTime: 0,
            currentAction: -1,
            actions: [{
                type: 'OPEN_DIALOG'
            }, {
                type: 'SEND_MESSAGE',
                data: {
                    text: 'Приветствую вас! Я дежурный юрист сайта, ' + getSettingsParam('operatorName') + '.',
                    owner: 'operator'
                }
            }, {
                type: 'SEND_MESSAGE',
                data: {
                    text: 'Могу чем-нибудь помочь? Моя консультация бесплатна. Задавайте вопрос.',
                    owner: 'operator'
                }
            }, {
                type: 'WAIT_FOR_CLIENT_MESSAGE'
            }, {
                type: 'SEND_MESSAGE',
                data: {
                    text: 'Давайте я отвечу на ваш вопрос по телефону. Так будет гораздо быстрее.',
                    owner: 'operator'
                }
            }, {
                type: 'SEND_MESSAGE',
                data: {
                    text: 'Сейчас появится форма. Оставьте в ней свои контактные данные.',
                    owner: 'operator'
                }
            }, {
                type: 'OPEN_CONTACTS_FORM',
                data: {
                    delay: 5000
                }
            }]
        }
    };
    
    window.INITIAL_APP = INITIAL_APP;
    
}());