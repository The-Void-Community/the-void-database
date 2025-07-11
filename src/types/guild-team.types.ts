export interface ITeam {
  id: string;
  name: string;

  owner_id: string;

  /** { memberId: roleId[] } */
  members: Map<string, string[]>;
  /** { roleId: roleName } */
  roles: Map<string, string>;
  /** channelId[] */
  channels: Array<string>;
}
