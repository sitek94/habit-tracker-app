import * as React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { useTranslation } from 'translations';

/**
 * Github Repo Link
 */
function GithubRepoLink() {
  const t = useTranslation();

  return (
    <Tooltip title={t('githubRepo')}>
      <IconButton
        target="_blank"
        color="inherit"
        label={t('githubRepo')}
        rel="noopener noreferrer"
        href="https://github.com/sitek94/pocket-globe-app"
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
}

export { GithubRepoLink };
