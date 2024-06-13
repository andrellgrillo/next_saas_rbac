import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherusers = ability.can('delete', 'User')