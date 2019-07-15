package uk.co.tsb.mobilebank.ui.<%= packageFolder %>.di

import dagger.Module
import dagger.android.ContributesAndroidInjector
import uk.co.tsb.mobilebank.ui.<%= packageFolder %>.<%= fragmentName %>Fragment
import uk.co.tsb.mobilebank.ui.<%= packageFolder %>.<%= fragmentName %>Module

@Module
abstract class <%= fragmentName %>FragmentProvider {

    @ContributesAndroidInjector(modules = [<%= fragmentName %>Module::class])
    abstract fun provide<%= fragmentName %>FragmentFactory(): <%= fragmentName %>Fragment
}