import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Link, MenuItem, Tooltip } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { useTranslation } from 'translations';

/**
 * Github Repo Link
 */

const commonProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
  href: 'https://github.com/sitek94/habit-tracker',
};

function GithubRepoLink({ variant = 'icon', ...props }) {
  const t = useTranslation();

  if (variant === 'icon') {
    return (
      <Tooltip title={t('githubRepo')}>
        <IconButton aria-label={t('githubRepo')} {...commonProps} {...props}>
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (variant === 'item') {
    return (
      <MenuItem component={Link} {...commonProps} {...props}>
        <IconButton>
          <GitHubIcon />
        </IconButton>
        <p>{t('githubRepo')}</p>
      </MenuItem>
    );
  }
}

GithubRepoLink.propTypes = {
  variant: PropTypes.oneOf(['icon', 'item']),
};

export { GithubRepoLink };
