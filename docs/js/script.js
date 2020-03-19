//スムーススクロール
$(function(){
  $("a[href*=#]:not([href=#])").click(function(){
    var target = $($(this).attr("href")).offset().top;
    target -= 40;
    $("html, body").animate({scrollTop : target}, 500);
    return false;
  });
});
//ナビカレント表示
$(function(){
  var navLink = $('nav li a');

  var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
    var targetContents = navLink.eq(i).attr('href');
    if(targetContents.charAt(0) == '#') {
      var targetContentsTop = $('' + targetContents + '').offset().top;
      var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
      // 配列に格納
      contentsArr[i] = [targetContentsTop, targetContentsBottom]
    }
  };
  // 現在地をチェックする
  function currentCheck() {
    // 現在のスクロール位置を取得
    var windowScrolltop = $(window).scrollTop();
    for (var i = 0; i < contentsArr.length; i++) {
      // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
      if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
        // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
        navLink.removeClass('current');
        navLink.eq(i).addClass('current');
        i == contentsArr.length;
      }
    };
  }
  // ページ読み込み時とスクロール時に、現在地をチェックする
  $(window).on('load scroll', function() {
    currentCheck();
  });
});

/* 幅が640px以下の場合 */
if (window.matchMedia( "(max-width: 640px)" ).matches) {
  //トグルメニュー
  $(function(){
    $("nav button").click(function(){
      $("nav ul").slideToggle(200);
      $(this).toggleClass('active');
    });
  });
  //ページ内リンクしたらulを閉じる
  $(function(){
    $("nav ul a").click(function(){
      $("nav ul").hide();
    });
  });

  /* 幅が640px以上の場合 */
} else {
  //追従ヘッダー
  $(function(){
    $('#sidebar').containedStickyScroll({
      closeChar: ''
    });
  });
}
