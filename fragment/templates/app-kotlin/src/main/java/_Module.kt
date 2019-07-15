package uk.co.tsb.mobilebank.ui.<%= packageFolder %>

import dagger.Binds
import dagger.Module
import uk.co.tsb.mobilebank.ui.<%= packageFolder %>.presenter.<%= fragmentName %>Presenter

@Module
abstract class <%= fragmentName %>Module {

    @Binds
    abstract fun provide<%= fragmentName %>Presenter(presenter: <%= fragmentName %>Presenter): <%= fragmentName %>Contract.Presenter
}