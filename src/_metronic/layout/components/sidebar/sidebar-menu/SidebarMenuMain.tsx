import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItemWithSubLink } from "./SidebarMenuItemWithSubLink";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem to="/dashboard" icon="element-11" title={intl.formatMessage({ id: "MENU.DASHBOARD" })} fontIcon="bi-app-indicator" />
      <SidebarMenuItem to="/builder" icon="switch" title="Timesheet" fontIcon="bi-layers" />

      <SidebarMenuItemWithSub  title="Ticket" fontIcon="bi-archive" icon="element-plus">
        <SidebarMenuItemWithSub  title="Operasional" hasBullet={true}>
          <SidebarMenuItemWithSub  title="Helpdesk & Support" hasBullet={true}>
            {/* People 1 */}
            <SidebarMenuItemWithSub title="Raafi B" hasBullet={true}>
              <SidebarMenuItemWithSubLink to="/overview/rs1" title="RS Al Islam Group" hasBullet={true}>
                <SidebarMenuItem to="overview/rs1/projectRS1" title="RS Al Islam Bandung" hasBullet={true}/>
              </SidebarMenuItemWithSubLink>
              <SidebarMenuItemWithSubLink to="/overview/rs2" title="RS Kasih Bunda Group" hasBullet={true}>
                <SidebarMenuItem to="overview/rs2/projectRS2" title="RSU Kasih Bunda" hasBullet={true}/>
              </SidebarMenuItemWithSubLink>
            </SidebarMenuItemWithSub>
            {/* People 2 */}
            <SidebarMenuItemWithSub title="Mario" hasBullet={true}>
              <SidebarMenuItemWithSubLink to="/overview/rs3" title="Ciputra Group" hasBullet={true}>
                <SidebarMenuItem to="overview/rs3/projectRS3" title="Cihos CRT" hasBullet={true}/>
                <SidebarMenuItem to="overview/rs3/projectRS4" title="Cihos CGC" hasBullet={true}/>
                <SidebarMenuItem to="overview/rs3/projectRS5" title="Cihos CMH" hasBullet={true}/>
              </SidebarMenuItemWithSubLink>
            </SidebarMenuItemWithSub>
          </SidebarMenuItemWithSub>
          <SidebarMenuItemWithSubLink to="/dashboard" title="Service Delivery" hasBullet={true}>

          </SidebarMenuItemWithSubLink>
        </SidebarMenuItemWithSub>

        {/* <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub> */}
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">Apps</span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub to="/apps/chat" title="Chat" fontIcon="bi-chat-left" icon="message-text-2">
        <SidebarMenuItem to="/apps/chat/private-chat" title="Private Chat" hasBullet={true} />
        <SidebarMenuItem to="/apps/chat/group-chat" title="Group Chart" hasBullet={true} />
        <SidebarMenuItem to="/apps/chat/drawer-chat" title="Drawer Chart" hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItem to="/apps/user-management/users" icon="abstract-28" title="User management" fontIcon="bi-layers" /> */}
      <div className="menu-item">
        <a target="_blank" className="menu-link" href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + "/changelog"}>
          <span className="menu-icon">
            <KTIcon iconName="code" className="fs-2" />
          </span>
          <span className="menu-title">Master Data</span>
        </a>
      </div>
    </>
  );
};

export { SidebarMenuMain };
