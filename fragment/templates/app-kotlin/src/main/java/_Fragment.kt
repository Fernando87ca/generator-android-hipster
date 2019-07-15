package <%= appPackage %>.ui.<%= packageFolder %>

import uk.co.tsb.mobilebank.ui.BaseMVPFragment
import uk.co.tsb.mobilebank.R
import javax.inject.Inject
import android.os.Bundle
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import dagger.android.support.AndroidSupportInjection
import kotlinx.android.synthetic.main.<%= underscoredFragmentName %>.*

class <%= fragmentName %>Fragment : BaseMVPFragment<<%= fragmentName %>Contract.View, <%= fragmentName %>Contract.Presenter>(),
        <%= fragmentName %>Contract.View {

    @Inject
    override lateinit var presenter: <%= fragmentName %>Contract.Presenter

    override fun getLayoutId(): Int = R.layout.<%= underscoredFragmentName %>

    override fun getToolbarId(): Int = R.id.PLACE_HERE_YOUR_TOOLBAR_ID


    // @TODO remove if there is no option menu
    override fun onCreateOptionsMenu(menu: Menu?, inflater: MenuInflater?) {
        menu?.clear()
        inflater!!.inflate(R.menu.YOUR_MENU, menu)
        super.onCreateOptionsMenu(menu, inflater)
    }

    // @TODO remove if there is no option menu
    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        when (item?.itemId) {
            android.R.id.home -> onBackPressed()
        }
        return super.onOptionsItemSelected(item)
    }

    // @TODO remove if there is no option menu
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        AndroidSupportInjection.inject(this)
        super.onViewCreated(view, savedInstanceState)

        presenter.start()
    }


    // @TODO this is an example, replace for your fragment needs
    companion object {
        private const val ARG_1 = "arg1"
        private const val ARG_2 = "arg2"

        fun newInstance(arg1: String, arg2: String): <%= fragmentName %>Fragment {
            val args = Bundle().also {
                it.putString(ARG_1, arg1)
                it.putString(ARG_2, arg2)
            }
            return <%= fragmentName %>Fragment().apply { arguments = args }
        }
    }
}
