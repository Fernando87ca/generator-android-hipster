package uk.co.tsb.mobilebank.ui.<%= packageFolder %>.di

import dagger.Module
import dagger.android.ContributesAndroidInjector
import uk.co.tsb.mobilebank.ui.<%= packageFolder %>.<%= fragmentName %>Fragment
import uk.co.tsb.mobilebank.ui.<%= packageFolder %>.<%= fragmentName %>Module
// android-hipster-needle-component-fragment-provider-imports

@Module
abstract class <%= fragmentName %>FragmentProvider {

    @ContributesAndroidInjector(modules = [
        // android-hipster-needle-component-fragment-provider
        <%= fragmentName %>Module::class])
    abstract fun provide<%= fragmentName %>FragmentFactory(): <%= fragmentName %>Fragment
}