package uk.co.tsb.mobilebank.ui.<%= packageFolder %>.presenter

import uk.co.tsb.mobilebank.ui.BasePresenter
import uk.co.tsb.mobilebank.ui.<%= fragmentPackageName %>.<%= fragmentName %>Contract
import javax.inject.Inject

class <%= fragmentName %>Presenter @Inject constructor(
        // android-hipster-needle-component-presenter
   )
    : BasePresenter<<%= fragmentName %>Contract.View>(), <%= fragmentName %>Contract.Presenter {

    override fun start() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}