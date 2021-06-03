function register ({ registerHook, peertubeHelpers }) {
  // TODO declare licence info in external place
  // TODO DRY use across client and server?
  const CCLicenceInfo = {
    "CC-BY": {
      id: 1,
      iconSrc: "https://licensebuttons.net/l/by/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by/4.0/" 
    },
    "CC-BY-SA": {
      id: 2,
      iconSrc: "https://licensebuttons.net/l/by-sa/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-sa/4.0/" 
    },
    "CC-BY-ND": {
      id: 3,
      iconSrc: "https://licensebuttons.net/l/by-nd/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nd/4.0/" 
    },
    "CC-BY-NC": {
      id: 4,
      iconSrc: "https://licensebuttons.net/l/by-nc/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc/4.0/" 
    },
    "CC-BY-NC-SA": {
      id: 5,
      iconSrc: "https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" 
    },
    "CC-BY-NC-ND": {
      id: 6,
      iconSrc: "https://licensebuttons.net/l/by-nc-nd/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc-nd/4.0/" 
    },
    "CC0": {
      id: 7,
      iconSrc: "https://licensebuttons.net/l/zero/1.0/80x15.png",
      href: "https://creativecommons.org/share-your-work/public-domain/cc0" 
    },
    "PDM": {
      id: 8,
      iconSrc: "https://licensebuttons.net/l/publicdomain/80x15.png",
      href: "https://creativecommons.org/share-your-work/public-domain/pdm" 
    }
  };

  let videoLicence;

  registerHook({
    target: 'filter:api.video-watch.video.get.result',
    handler: video => {
      videoLicence = video.licence
      return video
    }
  })

  registerHook({
    target: 'action:video-watch.video.loaded',
    handler: ( videojs, video ) => {
      // Insert licence icon next to date and views info elements
      {
        if (videoLicence && Object.keys(CCLicenceInfo).includes(videoLicence.label)) {
          let licenceHref    = CCLicenceInfo[videoLicence.label].href;
          let licenceIconSrc = CCLicenceInfo[videoLicence.label].iconSrc;

          let infoElems = document.getElementsByClassName('video-info-date-views')
          
          Array.from(infoElems).map(e => e.insertAdjacentHTML(
            'beforeend', 
            ` • 
            <a rel="license" href="${licenceHref}" target="_blank">
              <img src="${licenceIconSrc}" />
            </a>`
          ));
        }
      }
    }
  })  

  // Why does infoElems in video-watch.video.loaded handler remain empty without this hook? 
  registerHook({
    target: 'filter:internal.video-watch.player.build-options.result',
    handler: (result, params) => {
      return result
    }
  })
}

export {
  register
}