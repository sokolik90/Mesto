export default class UserInfo {
    constructor (name, job, avatar) {
      this.name = name;
      this.job = job;
      this.avatar = avatar;
    }

    updateUserInfo(gettingName, gettingJob) {
      this.name.textContent = gettingName;
      this.job.textContent = gettingJob;

    }

    setUserInfo(gettingName, gettingJob, gettingAvatar) {
      this.name.textContent = gettingName;
      this.job.textContent = gettingJob;
      this.avatar.style.backgroudImage = 'url('+gettingAvatar+')'
    }
  };
