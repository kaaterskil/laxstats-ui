/**
 * Directive that auto-sizes the height of a textarea element when typing.
 */
export function textareaDirective() {
    return {
        restrict: 'E',
        link: function(scope, elem, attr) {
            
            function update() {
                elem.css('height', 'auto');
                elem.css('height', elem[0].scrollHeight + 'px');
            }
            
            scope.$watch(attr.ngModel, () => update());
        }
    };
}