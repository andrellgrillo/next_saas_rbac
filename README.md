# Next.js SaaS + RBAC

this project contains all the necessary boilerplate to setup a multi-tenant SaaS with Nexjs including authentication and RBAC authorization.

## Features

### Authentication

- [X] It should be able to authenticate using e-mail e password;
- [X] It should be able to authenticate using Github account;
- [X] It should be able to recover password using e-mail;
- [X] It should be able to create an account (e-mail, name and password);

### Organizations

- [X] It should be able to create a new organization
- [ ] It should be able to get organization to wich the user belongs;
- [X] It should be able to update an organization;
- [X] It should be able to shutdown an organization;
- [X] ot should be able to transfer organization ownership;

### Invites

- [X] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;

### Members

- [X] It should be able to get organization members;
- [X] It should be able to update a member role;

### Projects

- [X] It should be able to get projects Within a organization;
- [X] It should be able to create a new project (name, url, description);
- [X] It should be able to update a project (name, url, description);
- [X] It should be able to delete a project;

### Billing

- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

### Roles

- Administrator
- Member
- Billing

### Permissions table

|                     | Administrator | Member | Billing | Anonymous |
|---------------------|---------------|--------|---------|-----------|
| Update organization    | ✅        | ❌     | ❌      | ❌       |
| Delete organization    | ✅        | ❌     | ❌      | ❌       |
| Invite a member        | ✅        | ❌     | ❌      | ❌       |
| Revoke an invite       | ✅        | ❌     | ❌      | ❌       |
| List members           | ✅        | ✅     | ✅      | ❌       |
| Transfer ownership     | ⚠️         | ❌     | ❌      | ❌       |
| Update member role     | ✅        | ❌     | ❌      | ❌       |
| Delete member          | ✅        | ⚠️     | ❌      | ❌       |
| List projects          | ✅        | ✅     | ✅      | ❌       |
| Create a new project   | ✅        | ✅     | ❌      | ❌       |
| Update a project       | ✅        | ⚠️     | ❌      | ❌       |
| Delete a project       | ✅        | ⚠️     | ❌      | ❌       |
| Get billing details    | ✅        | ❌     | ✅      | ❌       |
| Export billing details | ✅        | ❌     | ✅      | ❌       |

> ✅ = allowed
> ❌ = no allowed
> ⚠️ = allowed w/ conditions
