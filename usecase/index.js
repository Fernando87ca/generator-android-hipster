'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');
var _ = require('lodash');

var scriptBase = require('../script-base');
var util = require('util');

var ActivityGenerator = generators.Base.extend({});

util.inherits(ActivityGenerator, scriptBase);

module.exports = ActivityGenerator.extend({

    initializing: {
        getConfig: function (args) {
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
            this.autoparcel = true;
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
            message: 'What are the name of your UseCase (Without UseCaseSuffix. Ex: Login',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your UseCase name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }, {
            type: 'list',
            name: 'useCaseType',
            message: 'Witch type os use case you would create',
            choices: [{
                value: 'useCase',
                name: 'Use Case'
            }, {
                value: 'UseCaseWithParameter',
                name: 'Use Case With Parameter'
            }, {
                value: 'SingleUseCase',
                name: 'Single Use Case'
            }, {
                value: 'SingleUseCaseWithParameter',
                name: 'Single Use Case With Parameter'
            }, {
                value: 'CompletableUseCase',
                name: 'Completable Use Case'
            }, {
                value: 'CompletableUseCaseWithParameter',
                name: 'Completable Use Case With Parameter'
            }],
            default: 0
        }, {
            name: 'repository',
            message: 'Name of the repository associated to this use case, Ex: Accounts (will crate as AccountsRepository)',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your repository name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }, {
            name: 'fragment',
            message: 'What fragment would you like add this Use Case, (Without UseCaseSuffix). Ex: Login',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your repository name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }];

        this.prompt(prompts, function (props) {
            this.useCaseName = props.name;
            this.useCaseType = props.useCaseType;
            this.repositoryName = props.repository;
            this.fragment = props.fragment;
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
            console.log(this.useCaseName);
            console.log(this.useCaseType);
            console.log(this.repositoryName);
            console.log(this.fragment);
        },

        install: function () {
            //this.installDependencies();
        }
    }
});
