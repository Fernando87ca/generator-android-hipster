

import dagger.Binds
import dagger.Module
import uk.co.tsb.mobilebank.ui.webview.presenter.WebViewPresenter

@Module
abstract class Module {

    @Binds
    abstract fun providePresenter(presenter: Presenter): Contract.Presenter
}