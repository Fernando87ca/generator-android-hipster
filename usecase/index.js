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
                value: 'UseCase',
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
            name: 'dataSource',
            message: 'Name of datasource associated to this repository? (empty name will not create a new repository. Existing name only update reference on repository)',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your datasource name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }, {
            name: 'fragmentName',
            message: 'What fragment would you like add this Use Case, (Without UseCaseSuffix). Ex: Login',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your fragment name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }];

        this.prompt(prompts, function (props) {
            this.useCaseName = props.name;
            this.useCaseType = props.useCaseType;
            this.repositoryName = props.repository;
            this.dataSource = props.dataSource;
            this.fragmentName = props.fragmentName;
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
            this.useCaseName = _.capitalize(this.useCaseName).replace('UseCase', '');
            this.fragmentName = _.capitalize(this.fragmentName);
            this.packageName = this.useCaseName.toLowerCase();

            const mainPackage = this.mainPackage.replace(/\./g, '/');
            const projectPackage = this.genericPackage.replace(/\./g, '/');
            const packageDir = this.appPackage.replace(/\./g, '/');
            const ext = ".kt";

            // Creating folder structure
            const baseConstruction = (mainPackage + '/' + projectPackage + '/' + packageDir + '/domain/interactor/' + this.packageName).toLocaleLowerCase();
            mkdirp(baseConstruction);

            // Adding presenter at selected Presenter
            this.addUseCaseToPresenter(packageDir, this.fragmentName, this.useCaseName);

            // template for Use Case
            const templatesSource = 'app-kotlin/src/main/java/usecase/';
            if (!this.useCaseAlreadyExist(packageDir, this.useCaseName)) {
                this.template(templatesSource + '_UseCase' + ext, baseConstruction + '/' + this.useCaseName + 'UseCase' + ext, this, {});
            }

            // if repository is defined update the reference on use case and create repository
            if (this.repositoryName.length > 0) {
                this.repositoryName = _.capitalize(this.repositoryName);
                this.addRepositoryToUseCase(packageDir, this.useCaseName, this.repositoryName);

                // Creating Repository Interface
                const repositoryBaseConstruct = mainPackage + '/' + projectPackage + '/' + packageDir + '/domain/repository';
                this.template(templatesSource + '_Repository' + ext, repositoryBaseConstruct + '/' + this.repositoryName + 'Repository' + ext, this, {});

                // Creating Repository Implementation
                this.dataFolderName = this.repositoryName.toLowerCase();
                var repositoryImplBaseConstruct = mainPackage + '/' + projectPackage + '/' + packageDir + '/data/repository/' + this.dataFolderName;
                mkdirp(repositoryImplBaseConstruct);

                if (!this.repositoryAlreadyExist(packageDir, this.repositoryName))
                    this.template(templatesSource + '_RepositoryImpl' + ext, repositoryImplBaseConstruct + '/' + this.repositoryName + 'RepositoryImpl' + ext, this, {});
                }
            }
        },

        install: function () {
            //this.installDependencies();
        }

});
