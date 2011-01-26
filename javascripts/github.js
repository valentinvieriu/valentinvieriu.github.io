var Github = {
	initialize: function () {
		this.fetch();
	},
	fetch: function() {
		$.getJSON('http://github.com/api/v1/json/valentinvieriu?callback=?', Github.load);
	},
	load: function(github_data) {
		var gh = Github;
		var repositories = github_data.user.repositories;
		repositories.sort(function(a,b) {
			return (a.watchers + a.forks) - (b.watchers + b.forks);
		});
		$('.project_holder').hide();
		$.each(repositories, function(i, repository) {
			if (!repository.fork && !repository.private) {
				gh.displayRepository(repository, false);
			}
		});
	},
	displayRepository: function(repo, show_stats) {
		var repo_html = '<div class="repo"><h3><a href="' + repo.url + '">' + repo.name + '</a>';
		if (show_stats) {
			repo_html += ' (' + repo.watchers + ')';
		}
		repo_html += '</h3>';
		repo_html += '<p>' + repo.description + '</p>';
    if (repo.homepage) {
		  repo_html += '<p class="url"><a href="' + repo.homepage + '">&raquo; ' + repo.homepage + '</a></p>';
		}
		repo_html += '</div>';
		$('#projects').prepend(repo_html);
	}
};

$(function() {
	Github.initialize();
})