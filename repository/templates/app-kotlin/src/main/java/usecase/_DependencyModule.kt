package uk.co.tsb.mobilebank.ui.<%= fragmentPackage %>

import dagger.Module
import dagger.Provides
import uk.co.tsb.mobilebank.domain.repository.<%= repositoryName %>Repository
import uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.<%= repositoryName %>RepositoryImpl
import uk.co.tsb.mobilebank.utils.SecureStorage
import uk.co.tsb.mobilebank.utils.TsbPreferences
import uk.co.tsb.mobilebank.utils.environment.EnvironmentManager
// android-hipster-needle-component-dependency-module-datasource-imports
// android-hipster-needle-component-dependency-module-repository-imports

@Module
class <%= fragmentName %>DependencyModule {

    // android-hipster-needle-component-dependency-module-datasource

    @Provides
    fun provide<%= repositoryName %>Repository(<%= variableRepository %>Repository: <%= repositoryName %>RepositoryImpl) : <%= repositoryName %>Repository
        = <%= variableRepository %>Repository

    // android-hipster-needle-component-dependency-module-repository
}