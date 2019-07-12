'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');
var _ = require('lodash');
var _s = require('underscore.string');
var shelljs = require('shelljs');
var scriptBase = require('../script-base');
var util = require('util');

var ActivityGenerator = generators.Base.extend({});

util.inherits(ActivityGenerator, scriptBase);

module.exports = ActivityGenerator.extend({

    initializing: {
        getConfig: function (args) {
            console.log('inizializing config function fragment');

            this.appName = 'tsb-mobilebanking-android';
            this.mainPackage = 'tsb-mobile';
            this.genericPackage = 'src.main.java';
            this.imageLib = 'none';
            this.glide = false;
            this.picasso = false;
            this.eventbus = false;
            this.mixpanel = false;
            this.timber = false;
            this.jodatime = false;
            this.threetenabp = false;
            this.jodamoney = false;
            this.appPackage = 'uk.co.tsb.mobilebank';
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
            this.mvpembeed = true;
            this.nucleus = false;
        }
    },
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the ' + chalk.red('Android Hipster') + ' generator!'
        ));

        var defaultAppBaseName = 'Sample';

        var prompts = [{
            name: 'name',
            message: 'What are the name of your Fragment? (Without FragmentSuffix. Ex: Login (for a LoginFragment)',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your UseCase name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }];

        this.prompt(prompts, function (props) {
            this.fragmentName = props.name;
            this.fragmentPackageName = this.fragmentName;
            this.activity = false;
            this.useExistingComponentName = false;
            done();
        }.bind(this));
    },


    configuring: {
        saveSettings: function () {

        }
    },

    writing: {
        projectfiles: function () {
        },

        app: function () {
            this.fragmentName = _.capitalize(this.fragmentName).replace('Fragment', '');

            const mainPackage = this.mainPackage.replace(/\./g, '/');
            const projectPackage = this.genericPackage.replace(/\./g, '/');
            const packageFolder = this.fragmentPackageName.replace(/\./g, '/').replace(this.appPackage, '');
            const packageDir = this.appPackage.replace(/\./g, '/');
            const ext = ".kt";

            const baseConstruction = mainPackage + '/' + projectPackage + '/' + packageDir + '/ui' + '/' + packageFolder;
            mkdirp(baseConstruction + '/di');
            mkdirp(baseConstruction + '/presenter');

            // Check repository to remember the original calls
            const fragmentName = this.fragmentName + 'Fragment';
            const packageName = this.appPackage + '.ui.' + this.fragmentPackageName;
            const component = this.fragmentName + 'FragmentProvider';
            // @TODO: linia que genera los imports en las templates
            this.addComponentInjectionKotlin(fragmentName, packageDir, packageName, component);

            const templatesSource = 'app-kotlin/src/main/java/';
            this.template(templatesSource + '_Fragment' + ext, baseConstruction + '/' + this.fragmentName + 'Fragment' + ext, this, {});
            this.template(templatesSource + '_Presenter' + ext, baseConstruction + '/presenter/' + this.fragmentName + 'Presenter' + ext, this, {});
            this.template(templatesSource + '_Contract' + ext, baseConstruction + '/' + this.fragmentName + 'Contract' + ext, this, {});

            // Dagger Dependencies templates
            this.template(templatesSource + '_FragmentProvider' + ext, baseConstruction + '/di/' + this.fragmentName + 'FragmentProvider' + ext, this, {});
            this.template(templatesSource + '_Module' + ext, baseConstruction + '/' + this.fragmentName + 'Module' + ext, this, {});
        },

        install: function () {
            //this.installDependencies();
        },
    }
});
