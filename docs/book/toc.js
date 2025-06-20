// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML =
      '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="getting-started/index.html"><strong aria-hidden="true">2.</strong> Getting Started</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="getting-started/quickstart.html"><strong aria-hidden="true">2.1.</strong> Quickstart</a></li><li class="chapter-item expanded "><a href="reference/faq.html"><strong aria-hidden="true">2.2.</strong> FAQ</a></li><li class="chapter-item expanded "><a href="getting-started/system-requirements.html"><strong aria-hidden="true">2.3.</strong> System Requirements</a></li></ol></li><li class="chapter-item expanded "><a href="user-guides/index.html"><strong aria-hidden="true">3.</strong> User Guides</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="user-guides/configuration.html"><strong aria-hidden="true">3.1.</strong> Configuration</a></li><li class="chapter-item expanded "><a href="user-guides/usage.html"><strong aria-hidden="true">3.2.</strong> Usage</a></li><li class="chapter-item expanded "><a href="user-guides/troubleshooting.html"><strong aria-hidden="true">3.3.</strong> Troubleshooting</a></li></ol></li><li class="chapter-item expanded "><a href="architecture/index.html"><strong aria-hidden="true">4.</strong> Architecture</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="architecture/architecture-overview.html"><strong aria-hidden="true">4.1.</strong> Overview</a></li><li class="chapter-item expanded "><a href="architecture/context.html"><strong aria-hidden="true">4.2.</strong> Context</a></li><li class="chapter-item expanded "><a href="architecture/containers.html"><strong aria-hidden="true">4.3.</strong> Containers</a></li><li class="chapter-item expanded "><a href="architecture/components.html"><strong aria-hidden="true">4.4.</strong> Components</a></li><li class="chapter-item expanded "><a href="architecture/data-flow.html"><strong aria-hidden="true">4.5.</strong> Data Flow</a></li><li class="chapter-item expanded "><a href="architecture/extensibility.html"><strong aria-hidden="true">4.6.</strong> Extensibility</a></li><li class="chapter-item expanded "><a href="architecture/roadmap.html"><strong aria-hidden="true">4.7.</strong> Roadmap</a></li><li class="chapter-item expanded "><a href="architecture/ai-platform-overview-alt.html"><strong aria-hidden="true">4.8.</strong> AI Platform</a></li><li class="chapter-item expanded "><a href="architecture/adr-0000-template.html"><strong aria-hidden="true">4.9.</strong> ADR Template</a></li></ol></li><li class="chapter-item expanded "><a href="components/index.html"><strong aria-hidden="true">5.</strong> Component Guides</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="components/stack-agent.html"><strong aria-hidden="true">5.1.</strong> Stack Agent</a></li><li class="chapter-item expanded "><a href="components/ingestion-agent.html"><strong aria-hidden="true">5.2.</strong> Ingestion Agent</a></li><li class="chapter-item expanded "><a href="components/llm-runtime.html"><strong aria-hidden="true">5.3.</strong> LLM Runtime</a></li><li class="chapter-item expanded "><a href="components/ontology-crawler.html"><strong aria-hidden="true">5.4.</strong> Ontology Crawler</a></li><li class="chapter-item expanded "><a href="components/orchestrator.html"><strong aria-hidden="true">5.5.</strong> Orchestrator</a></li><li class="chapter-item expanded "><a href="components/planner-adapter.html"><strong aria-hidden="true">5.6.</strong> Planner Adapter</a></li><li class="chapter-item expanded "><a href="components/plugin-host.html"><strong aria-hidden="true">5.7.</strong> Plugin Host</a></li><li class="chapter-item expanded "><a href="components/report-agent.html"><strong aria-hidden="true">5.8.</strong> Report Agent</a></li><li class="chapter-item expanded "><a href="components/retrieval-layer.html"><strong aria-hidden="true">5.9.</strong> Retrieval Layer</a></li><li class="chapter-item expanded "><a href="components/telemetry.html"><strong aria-hidden="true">5.10.</strong> Telemetry</a></li></ol></li><li class="chapter-item expanded "><a href="operations/index.html"><strong aria-hidden="true">6.</strong> Operations</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="operations/ops-guide.html"><strong aria-hidden="true">6.1.</strong> Ops Guide</a></li><li class="chapter-item expanded "><a href="operations/security-policy.html"><strong aria-hidden="true">6.2.</strong> Security Policy</a></li><li class="chapter-item expanded "><a href="operations/telemetry-privacy.html"><strong aria-hidden="true">6.3.</strong> Telemetry &amp; Privacy</a></li></ol></li><li class="chapter-item expanded "><a href="release-engineering/index.html"><strong aria-hidden="true">7.</strong> Release Engineering</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="release-engineering/changelog.html"><strong aria-hidden="true">7.1.</strong> Changelog</a></li><li class="chapter-item expanded "><a href="release-engineering/release-process.html"><strong aria-hidden="true">7.2.</strong> Release Process</a></li><li class="chapter-item expanded "><a href="release-engineering/roadmap.html"><strong aria-hidden="true">7.3.</strong> Roadmap</a></li></ol></li><li class="chapter-item expanded "><a href="contributing/index.html"><strong aria-hidden="true">8.</strong> Contributing</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="../_includes/top-doc-contributors.html"><strong aria-hidden="true">8.1.</strong> Top Doc Contributors</a></li><li class="chapter-item expanded "><a href="contributing/how-to-contribute-docs.html"><strong aria-hidden="true">8.2.</strong> How to Contribute to Docs</a></li><li class="chapter-item expanded "><a href="contributing/contributing.html"><strong aria-hidden="true">8.3.</strong> Contributing Guide</a></li><li class="chapter-item expanded "><a href="contributing/code-of-conduct.html"><strong aria-hidden="true">8.4.</strong> Code of Conduct</a></li><li class="chapter-item expanded "><a href="contributing/MAINTAINERS.html"><strong aria-hidden="true">8.5.</strong> Maintainers</a></li></ol></li><li class="chapter-item expanded "><a href="reference/glossary.html"><strong aria-hidden="true">9.</strong> Reference</a></li><li class="chapter-item expanded "><a href="adr/0000-template.html"><strong aria-hidden="true">10.</strong> ADR Log</a></li></ol>';
    // Set the current, active page, and reveal it if it's hidden
    let current_page = document.location.href.toString().split('#')[0].split('?')[0];
    if (current_page.endsWith('/')) {
      current_page += 'index.html';
    }
    var links = Array.prototype.slice.call(this.querySelectorAll('a'));
    var l = links.length;
    for (var i = 0; i < l; ++i) {
      var link = links[i];
      var href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
        link.href = path_to_root + href;
      }
      // The "index" page is supposed to alias the first chapter in the book.
      if (
        link.href === current_page ||
        (i === 0 && path_to_root === '' && current_page.endsWith('/index.html'))
      ) {
        link.classList.add('active');
        var parent = link.parentElement;
        if (parent && parent.classList.contains('chapter-item')) {
          parent.classList.add('expanded');
        }
        while (parent) {
          if (parent.tagName === 'LI' && parent.previousElementSibling) {
            if (parent.previousElementSibling.classList.contains('chapter-item')) {
              parent.previousElementSibling.classList.add('expanded');
            }
          }
          parent = parent.parentElement;
        }
      }
    }
    // Track and set sidebar scroll position
    this.addEventListener(
      'click',
      function (e) {
        if (e.target.tagName === 'A') {
          sessionStorage.setItem('sidebar-scroll', this.scrollTop);
        }
      },
      { passive: true }
    );
    var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
    sessionStorage.removeItem('sidebar-scroll');
    if (sidebarScrollTop) {
      // preserve sidebar scroll position when navigating via links within sidebar
      this.scrollTop = sidebarScrollTop;
    } else {
      // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
      var activeSection = document.querySelector('#sidebar .active');
      if (activeSection) {
        activeSection.scrollIntoView({ block: 'center' });
      }
    }
    // Toggle buttons
    var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
    function toggleSection(ev) {
      ev.currentTarget.parentElement.classList.toggle('expanded');
    }
    Array.from(sidebarAnchorToggles).forEach(function (el) {
      el.addEventListener('click', toggleSection);
    });
  }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);
