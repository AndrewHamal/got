/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link rel="shortcut icon" href="/images/favicon.png" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          {/* page css */}
          <link rel="stylesheet" href="/client/assets/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/client/assets/css/animate.min.css" />
          <link
            rel="stylesheet"
            href="/client/assets/css/fontawesome.all.min.css"
          />
          <link
            rel="stylesheet"
            href="/client/assets/css/owl.carousel.min.css"
          />
          <link
            rel="stylesheet"
            href="/client/assets/css/owl.theme.default.min.css"
          />
          <link rel="stylesheet" href="/client/assets/css/navber.css" />
          <link rel="stylesheet" href="/client/assets/css/meanmenu.css" />
          <link rel="stylesheet" href="/client/assets/css/responsive.css" />
          <link rel="icon" type="image/png" href="assets/img/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/client/assets/css/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/client/assets/css/slick-theme.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/client/assets/css/custom.css"
          />
          <script src="/client/assets/js/jquery-3.6.0.min.js" />
          <script src="/client/assets/js/bootstrap.bundle.js" />
          <script src="/client/assets/js/jquery.meanmenu.js" />
          <script src="/client/assets/js/owl.carousel.min.js" />
          <script src="/client/assets/js/wow.min.js" />
          <script src="/client/assets/js/custom.js" />
          <script src="/client/assets/js/add-form.js" />
          <script src="/client/assets/js/form-dropdown.js" />
          <script src="/client/assets/js/slick.min.js" defer />
          {/* <script src="/client/assets/js/slick-slider.js"></script> */}
          {/* admin dashboard */}
          <link rel="icon" href="/admin/img/mini_logo.png" type="image/png" />
          <link rel="stylesheet" href="/admin/css/bootstrap1.min.css" />
          <link rel="stylesheet" href="/client/assets/css/style.css" />

          <link
            rel="stylesheet"
            href="/admin/vendors/themefy_icon/themify-icons.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/niceselect/css/nice-select.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/owl_carousel/css/owl.carousel.css"
          />
          <link rel="stylesheet" href="/admin/vendors/gijgo/gijgo.min.css" />
          <link
            rel="stylesheet"
            href="/admin/vendors/font_awesome/css/all.min.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/tagsinput/tagsinput.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/datepicker/date-picker.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/vectormap-home/vectormap-2.0.2.css"
          />
          <link rel="stylesheet" href="/admin/vendors/scroll/scrollable.css" />
          <link
            rel="stylesheet"
            href="/admin/vendors/datatable/css/jquery.dataTables.min.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/datatable/css/responsive.dataTables.min.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/datatable/css/buttons.dataTables.min.css"
          />
          <link
            rel="stylesheet"
            href="/admin/vendors/text_editor/summernote-bs4.css"
          />
          <link rel="stylesheet" href="/admin/vendors/morris/morris.css" />
          <link
            rel="stylesheet"
            href="/admin/vendors/material_icon/material-icons.css"
          />
          <link rel="stylesheet" href="/admin/css/metisMenu.css" />
          <link rel="stylesheet" href="/admin/css/style1.css" />
          <link
            rel="stylesheet"
            href="/admin/css/colors/default.css"
            id="colorSkinCSS"
          />

          <script src="/admin/js/jquery1-3.4.1.min.js"></script>
          <script src="/admin/js/popper1.min.js"></script>
          <script src="/admin/js/bootstrap1.min.js"></script>
          <script src="/admin/js/metisMenu.js" defer></script>

          <script src="/admin/vendors/count_up/jquery.waypoints.min.js"></script>
          <script src="/admin/vendors/chartlist/Chart.min.js"></script>
          <script src="/admin/vendors/count_up/jquery.counterup.min.js"></script>
          <script src="/admin/vendors/niceselect/js/jquery.nice-select.min.js"></script>
          <script src="/admin/vendors/owl_carousel/js/owl.carousel.min.js"></script>
          <script src="/admin/vendors/datatable/js/jquery.dataTables.min.js"></script>
          <script src="/admin/vendors/datatable/js/dataTables.responsive.min.js"></script>
          <script src="/admin/vendors/datatable/js/dataTables.buttons.min.js"></script>
          <script src="/admin/vendors/datatable/js/buttons.flash.min.js"></script>
          <script src="/admin/vendors/datatable/js/jszip.min.js"></script>
          <script src="/admin/vendors/datatable/js/pdfmake.min.js"></script>
          <script src="/admin/vendors/datatable/js/vfs_fonts.js"></script>
          <script src="/admin/vendors/datatable/js/buttons.html5.min.js"></script>
          <script src="/admin/vendors/datatable/js/buttons.print.min.js"></script>
          <script src="/admin/vendors/datepicker/datepicker.js"></script>
          <script src="/admin/vendors/datepicker/datepicker.en.js"></script>
          <script src="/admin/vendors/datepicker/datepicker.custom.js"></script>
          <script src="/admin/js/chart.min.js"></script>
          <script src="/admin/vendors/chartjs/roundedBar.min.js"></script>
          <script src="/admin/vendors/progressbar/jquery.barfiller.js"></script>
          <script src="/admin/vendors/tagsinput/tagsinput.js"></script>
          <script src="/admin/vendors/text_editor/summernote-bs4.js"></script>
          <script src="/admin/vendors/am_chart/amcharts.js"></script>
          <script src="/admin/vendors/scroll/perfect-scrollbar.min.js"></script>
          <script src="/admin/vendors/scroll/scrollable-custom.js"></script>
          <script src="/admin/vendors/vectormap-home/vectormap-2.0.2.min.js"></script>
          <script src="/admin/vendors/vectormap-home/vectormap-world-mill-en.js"></script>
          <script src="/admin/vendors/apex_chart/apex-chart2.js"></script>
          <script src="/admin/vendors/apex_chart/apex_dashboard.js"></script>
          <script src="/admin/vendors/chart_am/core.js"></script>
          <script src="/admin/vendors/chart_am/charts.js"></script>
          <script src="/admin/vendors/chart_am/animated.js"></script>
          <script src="/admin/vendors/chart_am/kelly.js"></script>
          <script src="/admin/vendors/chart_am/chart-custom.js"></script>
          <script src="/admin/js/dashboard_init.js"></script>

          {/* <script src="/admin/js/custom.js"></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
          />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
