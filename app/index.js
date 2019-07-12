'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');

var scriptBase = require('../script-base');
var util = require('util');

var AndroidManifest = require('androidmanifest');

var AppGenerator = generators.Base.extend({});

util.inherits(AppGenerator, scriptBase);

module.exports = AppGenerator.extend({
    initializing: {
        setupVars: function () {
            this.baseName = this.config.get('appName');
            console.log(this.baseName);
            this.jhipsterVersion = this.config.get('jhipsterVersion');
            this.testFrameworks = this.config.get('testFrameworks');

            var configFound = this.baseName != null;
            if (configFound) {
                this.existingProject = true;
            }

            this.appName = this.config.get('appName');
            this.language = this.config.get('language');
            this.appPackage = this.config.get('appPackage');

            this.nucleus = this.config.get('nucleus') || true;
            this.mvp = this.config.get('mvp') || 'nucleus';
            this.imageLib = this.config.get('imageLib') || 'glide';
            this.glide = this.config.get('glide');
            this.picasso = this.config.get('picasso');
            this.eventbus = this.config.get('eventbus') || true;
            this.mixpanel = this.config.get('mixpanel') || true;
            this.timber = this.config.get('timber') || true;
            this.jodatime = this.config.get('jodatime') || true;
            this.jodamoney = this.config.get('jodamoney') || true;
            this.threetenabp = this.config.get('threetenabp') || true;
            this.androidTargetSdkVersion = this.config.get('androidTargetSdkVersion');
            this.androidMinSdkVersion = this.config.get('minSdk');
            this.calligraphy = this.config.get('calligraphy') || true;
            this.playServices = this.config.get('playServices') || [];
            this.stetho = this.config.get('stetho') || true;
            this.printview = this.config.get('printview') || true;
            this.autoparcel = this.config.get('autoparcel') || true;
        }
    },
    prompting: function () {
        var done = this.async();

        if (this.existingProject) {
            done();
            return;
        }
        this.log(yosay(
            'Welcome to the ' + chalk.red('Android Hipster') + ' generator!'
        ));

        var defaultAppBaseName = 'android.hipster';

        this.prompt(function () {
            console.log('Assigning default variables');
/*
            this.appName = 'tsb-mobilebanking-android';
            this.imageLib = 'none';
            this.glide = false;
            this.picasso = false;
            this.eventbus = false;
            this.mixpanel = false;
            this.timber = false;
            this.jodatime = false;
            this.threetenabp = false;
            this.jodamoney = false;
            this.appPackage = 'uk.co.tsb.';
            this.androidTargetSdkVersion = 28;
            this.androidMinSdkVersion = 19;
            this.language = 'kotlin';
            this.calligraphy = false;
            this.playServices = false;
            this.paperparcel = false;
            this.stetho = false;
            this.printview = false;
            this.autoparcel = true; // Yeap, need to be true at this time
            // this.autoparcel = props.autoparcel
            this.mvp = 'embeed';
            this.mvpembeed = props.mvp == 'embeed';
            this.nucleus = props.mvp == 'nucleus';

*/
            done()
        }.bind(this))
    },

    configuring: {
        saveSettings: function () {
            if (this.existingProject) {
                return;
            }
            this.config.set('appPackage', this.appPackage);
            this.config.set('appName', this.appName);
            this.config.set('language', this.language);
            this.config.set('nucleus', this.nucleus);
            this.config.set('mvp', this.mvp);
            this.config.set('imageLib', this.imageLib);
            this.config.set('picasso', this.picasso);
            this.config.set('glide', this.glide);
            this.config.set('eventbus', this.eventbus);
            this.config.set('mixpanel', this.mixpanel);
            this.config.set('timber', this.timber);
            this.config.set('jodatime', this.jodatime);
            this.config.set('threetenabp', this.threetenabp);
            this.config.set('paperparcel', this.paperparcel);
            this.config.set('jodamoney', this.jodamoney);
            this.config.set('androidTargetSdkVersion', this.androidTargetSdkVersion);
            this.config.set('minSdk', this.androidMinSdkVersion);
            this.config.set('calligraphy', this.calligraphy);
            this.config.set('playServices', this.playServices);
            this.config.set('stetho', this.stetho);
            this.config.set('printview', this.printview);
            this.config.set('autoparcel', this.autoparcel);
            this.config.set('mvp', this.mvp);
            this.config.set('nucleus', this.mvp == 'nucleus');
        }
    },


    writing: {
        projectfiles: function () {
            this.copy('gitignore', '.gitignore');
            this.copy('gradle.properties', 'gradle.properties');
            this.copy('gradlew', 'gradlew');
            this.copy('gradlew.bat', 'gradlew.bat');
            this.template('settings.gradle', 'settings.gradle');
            this.directory('gradle', 'gradle');

            this.copy('common/gitignore', 'app/.gitignore');
            this.copy('common/proguard-rules.pro', 'app/proguard-rules.pro');

            this.template('_build.gradle', 'build.gradle', this, {});

            this.template('common/_app_build.gradle', 'app/build.gradle', this, {})
        },

        app: function () {

            console.log(this.stetho);
            var packageDir = this.appPackage.replace(/\./g, '/');

            //mkdirp('app');
            //mkdirp('app/libs');

            var appFolder = 'tsb-mobile';

            var ext = this.language == '.kt';

            

            /*this.template(appFolder + '/src/main/java/network/OAuthInterceptor.kt', 'app/src/main/java/' + packageDir + '/network/OAuthInterceptor.kt', this, {});
            this.template(appFolder + '/src/main/java/network/OkHttpNetworkInterceptors.kt', 'app/src/main/java/' + packageDir + '/network/OkHttpNetworkInterceptors.kt', this, {});
            this.template(appFolder + '/src/main/java/network/OkHttpInterceptors.kt', 'app/src/main/java/' + packageDir + '/network/OkHttpInterceptors.kt', this, {});
            this.template(appFolder + '/src/main/java/network/OkHttpInterceptorsModuleInternal.kt', 'app/src/internal/java/' + packageDir + '/network/OkHttpInterceptorsModule.kt', this, {});
            this.template(appFolder + '/src/main/java/network/OkHttpInterceptorsModule.kt', 'app/src/production/java/' + packageDir + '/network/OkHttpInterceptorsModule.kt', this, {});

            this.template(appFolder + '/src/main/java/service/LogoutExecutor.kt', 'app/src/main/java/' + packageDir + '/service/LogoutExecutor.kt', this, {});
            this.template(appFolder + '/src/main/java/service/push/PushExtras.kt', 'app/src/main/java/' + packageDir + '/service/push/PushExtras.kt', this, {});

            this.template(appFolder + '/src/main/java/environment', 'app/src/internal/java/' + packageDir + '/environment', this, {});
            this.template(appFolder + '/src/main/java/environment', 'app/src/production/java/' + packageDir + '/environment', this, {});

            this.template(appFolder + '/src/main/java/application', 'app/src/main/java/' + packageDir + '/application', this, {});
            this.template(appFolder + '/src/main/java/di', 'app/src/main/java/' + packageDir + '/di', this, {});
            this.template(appFolder + '/src/main/java/domain', 'app/src/main/java/' + packageDir + '/domain', this, {});

            if (this.language == 'kotlin') {
                this.template(appFolder + '/src/main/java/extensions/ContextExtensions.kt', 'app/src/main/java/' + packageDir + '/extensions/ContextExtensions.kt', this, {});
                this.template(appFolder + '/src/main/java/extensions/Extensions.kt', 'app/src/main/java/' + packageDir + '/extensions/Extensions.kt', this, {});
                if (this.nucleus == true) {
                    this.template(appFolder + '/src/main/java/extensions/PresenterExtensions.kt', 'app/src/main/java/' + packageDir + '/extensions/PresenterExtensions.kt', this, {})
                }
            }

            if (this.glide) {
                this.template(appFolder + '/src/main/java/application/GlideModule.kt', 'app/src/main/java/' + packageDir + '/application/GlideModule.kt', this, {});
            }

            this.template(appFolder + '/src/main/java/model/OAuth.kt', 'app/src/main/java/' + packageDir + '/model/OAuth.kt', this, {});

            this.template(appFolder + '/src/main/java/ui/base/BaseActivity.kt', 'app/src/main/java/' + packageDir + '/ui/base/BaseActivity.kt', this, {});
            this.template(appFolder + '/src/main/java/ui/base/BasePresenter.kt', 'app/src/main/java/' + packageDir + '/ui/base/BasePresenter.kt', this, {});
            this.template(appFolder + '/src/main/java/ui/base/BaseFragment.kt', 'app/src/main/java/' + packageDir + '/ui/base/BaseFragment.kt', this, {});
            this.template(appFolder + '/src/main/java/ui/base/EmptyPresenter.kt', 'app/src/main/java/' + packageDir + '/ui/base/EmptyPresenter.kt', this, {});
            this.template(appFolder + '/src/main/java/ui/base/PresenterView.kt', 'app/src/main/java/' + packageDir + '/ui/base/PresenterView.kt', this, {});
            this.template(appFolder + '/src/main/java/ui/components/Dialogs.kt', 'app/src/main/java/' + packageDir + '/ui/components/Dialogs.kt', this, {});
            if (this.language == 'kotlin') {
                if (this.eventbus) {
                    this.template(appFolder + '/src/main/java/ui/base/EventBusUser.kt', 'app/src/main/java/' + packageDir + '/ui/base/EventBusUser.kt', this, {})
                }

                this.template(appFolder + '/src/main/java/ui/base/IFailMessage.kt', 'app/src/main/java/' + packageDir + '/ui/base/IFailMessage.kt', this, {});
                this.template(appFolder + '/src/main/java/ui/base/IProgressActivity.kt', 'app/src/main/java/' + packageDir + '/ui/base/IProgressActivity.kt', this, {});
                this.template(appFolder + '/src/main/java/ui/base/IToolbarActivity.kt', 'app/src/main/java/' + packageDir + '/ui/base/IToolbarActivity.kt', this, {});
                this.template(appFolder + '/src/main/java/ui/base/ProgressPresenterView.kt', 'app/src/main/java/' + packageDir + '/ui/base/ProgressPresenterView.kt', this, {});
            }

            this.template(appFolder + '/src/main/java/storage', 'app/src/main/java/' + packageDir + '/storage', this, {});
            if (this.nucleus == false) {
                this.template(appFolder + '/src/main/java/ui/base/Presenter.kt', 'app/src/main/java/' + packageDir + '/ui/base/Presenter.kt', this, {})
            }
            if (this.timber) {
                this.template(appFolder + '/src/main/java/util/logging', 'app/src/main/java/' + packageDir + '/util/logging', this, {})
            }

            if (this.jodatime) {
                this.template(appFolder + '/src/main/java/util/gson/DateTimeTypeConverter.kt', 'app/src/main/java/' + packageDir + '/util/gson/DateTimeTypeConverter.kt', this, {});
                this.template(appFolder + '/src/main/java/util/gson/DateTimeZoneTypeConverter.kt', 'app/src/main/java/' + packageDir + '/util/gson/DateTimeZoneTypeConverter.kt', this, {})
            }
            if (this.jodamoney) {
                this.template(appFolder + '/src/main/java/util/gson/CurrencyUnitTypeConverter.kt', 'app/src/main/java/' + packageDir + '/util/gson/CurrencyUnitTypeConverter.kt', this, {});
                this.template(appFolder + '/src/main/java/util/gson/MoneyTypeConverter.kt', 'app/src/main/java/' + packageDir + '/util/gson/MoneyTypeConverter.kt', this, {})
            }

            this.template(appFolder + '/src/main/java/util/gson/GsonModule.kt', 'app/src/main/java/' + packageDir + '/util/gson/GsonModule.kt', this, {});
            this.template(appFolder + '/src/main/java/util/DensityUtil.kt', 'app/src/main/java/' + packageDir + '/util/DensityUtil.kt', this, {});
            this.template(appFolder + '/src/main/java/util/ExtractSingleResult.kt', 'app/src/main/java/' + packageDir + '/util/ExtractSingleResult.kt', this, {});
            this.template(appFolder + '/src/main/java/util/LinearMarginItemDecoration.kt', 'app/src/main/java/' + packageDir + '/util/LinearMarginItemDecoration.kt', this, {});
            this.template(appFolder + '/src/main/java/util/StringUtils.kt', 'app/src/main/java/' + packageDir + '/util/StringUtils.kt', this, {});
            this.template(appFolder + '/src/main/java/util/PermissionUtils.kt', 'app/src/main/java/' + packageDir + '/util/PermissionUtils.kt', this, {});

            if (this.language == 'kotlin') {
                this.template(appFolder + '/src/main/java/domain/repository/exception/ApiException.kt', 'app/src/main/java/' + packageDir + '/domain/repository/exception/ApiException.kt', this, {});
                this.template(appFolder + '/src/main/java/domain/repository/exception/ErrorMessage.kt', 'app/src/main/java/' + packageDir + '/domain/repository/exception/ErrorMessage.kt', this, {});
                this.template(appFolder + '/src/main/java/util/ExtractErrorUtil.kt', 'app/src/main/java/' + packageDir + '/util/ExtractErrorUtil.kt', this, {});
                this.template(appFolder + '/src/main/java/util/ExtractResult.kt', 'app/src/main/java/' + packageDir + '/util/ExtractResult.kt', this, {});
                this.template(appFolder + '/src/main/java/util/RetryWhen.kt', 'app/src/main/java/' + packageDir + '/util/RetryWhen.kt', this, {});
                this.template(appFolder + '/src/main/java/util/RetrySingleWhen.kt', 'app/src/main/java/' + packageDir + '/util/RetrySingleWhen.kt', this, {});
            }

            this.template(appFolder + '/src/main/java/ui/main', 'app/src/main/java/' + packageDir + '/ui/main', this, {}); */

            /* mkdirp('app/src/main/assets');
            mkdirp('app/src/main/res'); */

            /* this.directory('resources/assets', 'app/src/main/assets');

            this.directory('resources/res', 'app/src/main/res');

            this.template('resources/_AndroidManifest.xml', 'app/src/main/AndroidManifest.xml', this, {});
            this.template('../../dependencies.json', 'dependencies.json', this, {}).on('end', function () {
                this.installGradleDependencies(this, false);
            });

            mkdirp('app/src/debug'); */

        }
    },
    install: function () {

    }
});
