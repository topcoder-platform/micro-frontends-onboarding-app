export function checkOnboarding(resp) {
  if (resp.data.length === 0) {
    return false;
  }
  const data = resp.data.filter(
    item => item.traitId === 'onboarding_checklist'
  )[0].traits.data[0].profile_completed;
  if (data.status === 'completed') {
    return '/onboard/complete';
  }
  const steps = {
    '/onboard/': ['profile_picture', 'skills'],
    '/onboard/contact-details': ['country'],
    '/onboard/payments-setup': [],
    '/onboard/build-my-profile': ['bio', 'work', 'education', 'language'],
  };
  if (data.status === 'pending_at_user') {
    const flags = Object.keys(data.metadata)
    for (const step of Object.keys(steps)) {
      for (const flag of steps[step]) {
        if (flags.indexOf(flag) >= 0 && !data.metadata[flag]) {
          return step;
        }
      }
    }
  }
  return false;
}
