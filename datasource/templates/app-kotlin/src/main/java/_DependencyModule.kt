package uk.co.tsb.mobilebank.ui.<%= fragmentPackage %>

import dagger.Module
import dagger.Provides
import uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.datasource.<%= dataSourceName %>DataSource
import uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.datasource.mock.<%= dataSourceName %>MockDataSource
import uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.datasource.remote.<%= dataSourceName %>RemoteDataSource
import uk.co.tsb.mobilebank.domain.repository.<%= repositoryName %>Repository
import uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.<%= repositoryName %>RepositoryImpl
import uk.co.tsb.mobilebank.utils.SecureStorage
import uk.co.tsb.mobilebank.utils.TsbPreferences
import uk.co.tsb.mobilebank.utils.environment.EnvironmentManager

@Module
class <%= fragmentName %>DependencyModule {

    @Provides
    fun provide<%= dataSourceName %>DataSource(preferences: TsbPreferences): <%= dataSourceName %>DataSource {
        return if (preferences.secureStorage is SecureStorage) {
            val selectedEnvironment = (preferences.secureStorage as SecureStorage).getSelectedEnronment()

            if (EnvironmentManager.checkIfSelectedEnvironmentIsMock(selectedEnvironment)) {
                return <%= dataSourceName %>MockDataSource()
            }
           <%= dataSourceName %>RemoteDataSource()
        } else {
            <%= dataSourceName %>MockDataSource()
        }
    }

    @Provides
    fun provide<%= repositoryName %>Repository(<%= variableRepository %>Repository: <%= repositoryName %>RepositoryImpl) : <%= repositoryName %>Repository
        = <%= variableRepository %>Repository
}