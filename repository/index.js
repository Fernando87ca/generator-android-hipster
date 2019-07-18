'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');
var _ = require('lodash');
var async = require('async');

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
            name: 'repository',
            message: 'Name of the repository associated to this use case, Ex: Accounts (will crate as AccountsRepository)',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your repository name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }, {
            name: 'usecase',
            message: 'At which use case you would associate repository, (Without UseCaseSuffix). Ex: Login',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your fragment name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }];

        this.prompt(prompts, function (props) {
            this.repositoryName = props.repository;
            this.useCaseName = props.usecase;
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
            const mainPackage = this.mainPackage.replace(/\./g, '/');
            const projectPackage = this.genericPackage.replace(/\./g, '/');
            const packageDir = this.appPackage.replace(/\./g, '/');
            const ext = ".kt";

            this.repositoryName = _.capitalize(this.repositoryName);
            this.addRepositoryToUseCase(packageDir, this.useCaseName, this.repositoryName);

            // Creating Repository Interface
            const templatesSource = 'app-kotlin/src/main/java/usecase/';
            const repositoryBaseConstruct = mainPackage + '/' + projectPackage + '/' + packageDir + '/domain/repository';
            this.template(templatesSource + '_Repository' + ext, repositoryBaseConstruct + '/' + this.repositoryName + 'Repository' + ext, this, {});

            // Creating Repository Implementation
            this.dataFolderName = this.repositoryName.toLowerCase();
            var repositoryImplBaseConstruct = mainPackage + '/' + projectPackage + '/' + packageDir + '/data/repository/' + this.dataFolderName;
            mkdirp(repositoryImplBaseConstruct);

            if (!this.repositoryAlreadyExist(packageDir, this.repositoryName))
                this.template(templatesSource + '_RepositoryImpl' + ext, repositoryImplBaseConstruct + '/' + this.repositoryName + 'RepositoryImpl' + ext, this, {});
        }

    },

    install: function () {
        //this.installDependencies();
    }

});
