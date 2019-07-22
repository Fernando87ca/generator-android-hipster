# generator-android-hipster
> Android generator based on MVP, Dagger2, RxJava, Java/Kotlin Stack and usefull libraries for Android

---

# How install TSB generator?

To install TSB generator, follow the instructions:

- Download the LTS version of nodejs on the following page: https://nodejs.org/es/
- Download android-hipster generator project for TSB on your computer
- Go to generator project folder and tip the following command: npm link

TSB hipster generator will generate TSB hipster generator will generate boilerplate for each project layer. depend of selected command.

---

# How it works?

Each project layer have and specific command to generate boilerplate code, in total we have four commands:

## Generate MVP project structure:
    
    yo android-hipster:fragment
    
This command will generate basic mvp structure project that will contain the following files:

- FooFragment.kt
- FooPresenter.kt
- FooContract.kt
- FooFragmentProvider.kt
- FooModule.kt
- fragment_foo.xml
- FooPresenterTest.kt

Optional:

you also include the following needles on NavigationController.kt to add navigation boiler plate code:

- // android-hipster-needle-component-navigatorController
- // android-hipster-needle-component-navigatorController-import
    
    
## Generate Use Case

This command will generate the basic files for Use Case

    yo android-hipster:usecase
    
This command will generate:

- FooUseCase.kt
- Will inject use case on FooPresenter.kt

## Generate Repository

This command will generate the basic files for Repository

    yo android-hipster:repository
    
This command will generate:

- FooRepository.kt
- FooRepositoryImpl.kt
- FooDependencyModule.kt
- Will Inject Repository interface on Use Case

## Generate Use Case

This command will generate the basic files for Use Case

    yo android-hipster:datasource
    
This command will generate:

- FooDataSource.kt
- FooMockDataSource.kt
- FooRemoteDataSource.kt
- Will inject Data Source interface on Repository
- Will Provide remote/mock data source depending on environment selected on FooDependencyModule.kt