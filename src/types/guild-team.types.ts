export interface ITeam {
  id: string;
  name: string;

  owner_id: string;

  /** { memberId: roleId[] } */
  members: Map<string, string[]>;
  /** { roleName: roleId } */
  roles: Map<string, string>;
};