import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import { ProjectRS1 } from '../modules/profile/components/ProjectRS1'
import { ProjectRS2 } from '../modules/profile/components/ProjectRS2'
import { Overview } from '../modules/profile/components/Overview'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { ProjectRS3 } from '../modules/profile/components/ProjectRS3'
import { Overview2 } from '../modules/profile/components/Overview2'
import { Overview3 } from '../modules/profile/components/Overview3'
import { ProjectRS4 } from '../modules/profile/components/ProjectRS4'
import { ProjectRS5 } from '../modules/profile/components/ProjectRS5'
import { ProjectFinal } from '../modules/profile/components/project/projectFinal'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='/overview/rs1/'
          element={
            <SuspensedView>
              <Overview />
            </SuspensedView>
          }
        />
        <Route
          path='/overview/rs2/'
          element={
            <SuspensedView>
              <Overview2 />
            </SuspensedView>
          }
        />
        <Route
          path='/overview/rs3/'
          element={
            <SuspensedView>
              <Overview3 />
            </SuspensedView>
          }
        />
        <Route
          path='overview/rs1/projectRS1'
          element={
            <SuspensedView>
              <ProjectRS1 />
            </SuspensedView>
          }
        />
        {/* <Route
          path='overview/rs2/projectRS2'
          element={
            <SuspensedView>
              <ProjectRS2 />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='overview/rs3/projectRS3'
          element={
            <SuspensedView>
              <ProjectRS3 />
            </SuspensedView>
          }
        />
        <Route
          path='overview/rs3/projectRS4'
          element={
            <SuspensedView>
              <ProjectRS4 />
            </SuspensedView>
          }
        />
        <Route
          path='overview/rs3/projectRS5'
          element={
            <SuspensedView>
              <ProjectRS5 />
            </SuspensedView>
          }
        /> */}

        <Route
          path='overview/rs2/projectRS2'
          element={
            <SuspensedView>
              <ProjectFinal children={'RSU KASIH BUNDA'} />
            </SuspensedView>
          }
        />
        <Route
          path='overview/rs3/projectRS3'
          element={
            <SuspensedView>
              <ProjectFinal children={'Cihos CRT'} />
            </SuspensedView>
          }
        />
        <Route
          path='overview/rs3/projectRS4'
          element={
            <SuspensedView>
              <ProjectFinal children={'Cihos CGC'} />
            </SuspensedView>
          }
        />
        <Route
          path='overview/rs3/projectRS5'
          element={
            <SuspensedView>
              <ProjectFinal children={'Cihos CMH'} />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
