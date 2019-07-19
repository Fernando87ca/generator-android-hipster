package uk.co.tsb.mobilebank.ui.<%= testFragmentPackage %>.presenter

import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.whenever
import junit.framework.TestCase.assertEquals
import io.reactivex.Scheduler
import io.reactivex.schedulers.Schedulers
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import uk.co.tsb.mobilebank.ui.<%= testFragmentPackage %>.<%= fragmentName %>Contract
// android-hipster-needle-test-imports

class <%= fragmentName %>PresenterTest {

    private lateinit var presenter: <%= fragmentName %>Presenter
    private val view: <%= fragmentName %>Contract.View = mock()
    private val scheduler: Scheduler = Schedulers.trampoline()

    // android-hipster-needle-test-usecase-mock-values


   @BeforeEach
   fun setUp() {
        // @TODO add here your mocks

        presenter = <%= fragmentName %>Presenter(
            // android-hipster-needle-test-usecase-mock
            scheduler
        ).also {
            it.attachView(view)
        }
   }

   @Test
   fun `example test`() {
        assertEquals(true, false)
   }
}