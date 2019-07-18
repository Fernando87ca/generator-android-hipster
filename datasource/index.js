'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');
var _ = require('lodash');
var fileExists = require('file-exists');
var shelljs = require('shelljs');

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
        var defaultName = '';

        var prompts = [{
            name: 'name',
            message: 'What are the name of your DataSource (Without DataSourceSuffix. Ex: Accounts',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your data source name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }, {
            name: 'repository',
            message: 'At witch repository do you want to associate this data source? (Enter without Repository suffix), ex: Accounts',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your repository name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }, {
            name: 'fragment',
            message: 'Fragment name to add Dagger dependencies. Without suffix, ex: Login',
            store: true,
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your repository name cannot contain special characters or a blank space, using the default name instead : ' + defaultAppBaseName;
            },
            default: this.defaultAppBaseName
        }];

        this.prompt(prompts, function (props) {
            this.dataSourceName = _.capitalize(props.name);
            this.repositoryName = _.capitalize(props.repository);
            this.fragmentName = _.capitalize(props.fragment);
            done()
        }.bind(this))
    },

    configuring: {
        saveSettings: function () {
        }
    },

    writing: {
        projectfiles: function () {
        },

        app: function () {
            this.fragmentPackage = this.fragmentName.toLowerCase();
            this.variableRepository = this.repositoryName.charAt(0).toLowerCase() + this.repositoryName.slice(1);
            const mainPackage = this.mainPackage.replace(/\./g, '/');
            const projectPackage = this.genericPackage.replace(/\./g, '/');
            const packageDir = this.appPackage.replace(/\./g, '/');
            const ext = ".kt";


            // creating folder structure
            this.dataFolderName = this.repositoryName.toLowerCase();
            const repositoryBasePath = mainPackage + '/' + projectPackage + '/' + packageDir + '/data/repository/' + this.dataFolderName;
            const dataSourceBasePath = repositoryBasePath + '/datasource';
            const fragmentBasePath = mainPackage + '/' + projectPackage + '/' + packageDir + '/ui/' + this.fragmentPackage;

            mkdirp(repositoryBasePath + '/mapper');
            mkdirp(dataSourceBasePath + '/remote');
            mkdirp(dataSourceBasePath + '/mock');

            // Inject data source into to repository
            this.addDataSourceToRepositoryImpl(repositoryBasePath, this.repositoryName, this.dataSourceName);
            this.addDependencyModuleToFragmentProvider(fragmentBasePath, this.fragmentName, this.dataSourceName);

            // Generating templates
            const templatesSource = 'app-kotlin/src/main/java/';
            // Templates for Data Source
            this.template(templatesSource + '_DataSource' + ext, dataSourceBasePath + '/' + this.dataSourceName + 'DataSource' + ext, this, {});
            this.template(templatesSource + '_MockDataSource' + ext, dataSourceBasePath + '/mock/' + this.dataSourceName + 'MockDataSource' + ext, this, {});
            this.template(templatesSource + '_RemoteDataSource' + ext, dataSourceBasePath + '/remote/' + this.dataSourceName + 'RemoteDataSource' + ext, this, {});

            // Template for modules
            this.template(templatesSource + '_DependencyModule' + ext, fragmentBasePath + '/' + this.fragmentName + 'DependencyModule' + ext, this, {});
        },

        install: function () {
        }
    }
});
