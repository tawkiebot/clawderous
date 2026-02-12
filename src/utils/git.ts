/**
 * Simple Git wrapper for Clawederous
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

export class SimpleGit {
  private repoPath: string;

  constructor(repoPath: string = '.') {
    this.repoPath = repoPath;
  }

  /**
   * Initialize a new git repository
   */
  init(): void {
    execSync('git init', { cwd: this.repoPath, stdio: 'inherit' });
  }

  /**
   * Stage files
   */
  add(files: string[]): void {
    const cmd = files.length > 0 ? `git add ${files.join(' ')}` : 'git add .';
    execSync(cmd, { cwd: this.repoPath, stdio: 'inherit' });
  }

  /**
   * Commit changes
   */
  commit(message: string): void {
    execSync(`git commit -m "${message}"`, { cwd: this.repoPath, stdio: 'inherit' });
  }

  /**
   * Get repository status
   */
  status(): string {
    return execSync('git status --porcelain', { cwd: this.repoPath, encoding: 'utf-8' });
  }

  /**
   * Check if directory is a git repo
   */
  isRepo(): boolean {
    try {
      execSync('git rev-parse --git-dir', { cwd: this.repoPath, stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get last commit message
   */
  lastCommit(): string {
    return execSync('git log -1 --pretty=%s', { cwd: this.repoPath, encoding: 'utf-8' }).trim();
  }

  /**
   * Commit all changes
   */
  commitAll(message: string): void {
    this.add([]);
    this.commit(message);
  }
}

/**
 * Auto-commit helper for Clawederous
 */
export function autoCommit(repoPath: string, message: string): void {
  const git = new SimpleGit(repoPath);
  
  if (!git.isRepo()) {
    git.init();
  }

  const status = git.status().trim();
  if (status) {
    git.commitAll(message);
    console.log(`✅ Committed: ${message}`);
  } else {
    console.log('No changes to commit');
  }
}
