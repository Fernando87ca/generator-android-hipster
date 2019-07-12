import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class FragmentProvider {

    @ContributesAndroidInjector(modules = [Module::class])
    abstract fun provideFragmentFactory(): Fragment
}